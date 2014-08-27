// inlets and outlets
inlets  = 1;
outlets = 1;

// global variables and arrays
var nrpn_index_lsb = -1;
var nrpn_index_msb = -1;
var value_lsb      = -1;
var value_msb      = -1;

var nrpn_index_computed = -1;
var value_computed      = -1;

// methods start here

// list - expects a CC Index + Value as argument
// filters out NRPN and RPN values and assigns to variables
// Passes through all other CCs
//list.immediate=1;
function list(val) {
  // MIDI CC constants
  const CC_NRPN_MSB = 99;
  const CC_NRPN_LSB = 98;
  const CC_DATA_MSB = 6;
  const CC_DATA_LSB = 38;
  /* Incoming examples:
    CC_NRPN_MSB A
    CC_NRPN_LSB B
    CC_DATA_MSB X
*/
    if(arguments.length==2) {

        var incoming_cc_index = arguments[0];
        var incoming_cc_value = arguments[1];

        switch(incoming_cc_index)
        {

          case CC_NRPN_MSB:  // 99
            // TODO :: handle out of order or reset LSB in this case?
            nrpn_index_msb = incoming_cc_value << 7;
            // Create the 14 bit NRPN index
            nrpn_index_computed = nrpn_index_msb | nrpn_index_lsb;
            break;
          
          case CC_NRPN_LSB:  // 98
            nrpn_index_lsb = incoming_cc_value;
            // Create the 14 bit NRPN index
            nrpn_index_computed = nrpn_index_msb | nrpn_index_lsb;
            break;

          case CC_DATA_MSB: // 6
            if (nrpn_index_computed > 0) {
              // value_msb = incoming_cc_value << 7;
              // if(value_lsb > 0) {} // BS2 only sends the MSB. This test is 'normal' but i guess BS2 isn't?
              send_nrpn(nrpn_index_computed, incoming_cc_value);
              //reset();  //Don't reset. BS2 does  a sort of
// "running status" NRPNs don't repeat the NRPN message just the DATA
            }
            break;
        
          case CC_DATA_LSB: // 38
            if (nrpn_index_computed > 0) {
              value_msb = incoming_cc_value;
            }
            break;
    
          default:
            send_cc(incoming_cc_index, incoming_cc_value);
            break;
        }
    }
}

// clear storage variables
function reset() {
  nrpn_index_lsb = -1;  
  nrpn_index_msb = -1;
  value_lsb      = -1;
  value_msb      = -1;

  nrpn_index_computed     = -1;
  value_computed          = -1;
}

var cc_names  = new Array(120);
cc_names[5]   ={ param: "glide_time", random: false };
cc_names[7]   = { param: "patch_volume", random: false, min:0, max:127 }; //unused
cc_names[70]  = { param: "m4l.osc1.range.input", random: true, min:0, max:3};
cc_names[71]  = { param: "osc1_mod_env_pitch", random: false };
cc_names[72]  = { param: "osc1_mod_env_PW", random: true };
cc_names[73]  = { param: "osc1PW_lfo2", random: true };
cc_names[74]  = { param: "osc1_pw", random: true, min:0, max:127 };
cc_names[75]  = { param: "m4l.osc2.range.input", random: true,  min:0, max:3 };
cc_names[76]  = { param: "osc2_mod_env_pitch", random: false };
cc_names[77]  = { param: "osc2_mod_env_PW", random: true };
cc_names[78]  = { param: "osc2PW_lfo2", random: true };
cc_names[79]  = { param: "osc2_pw", random: true, min:0, max:127 };
cc_names[80]  = { param: "sub_wave", random: true, min:0, max:2 };
cc_names[81]  = { param: "sub_oct", random: true, min: 62, max: 63};
cc_names[82]  = { param: "filter_res", random: true, min:0, max:127 };
cc_names[83]  = { param: "m4l.filter.type.input", random: true, min:0, max:1 };
cc_names[84]  = { param: "m4l.filter.shape.input", random: true, min:0, max:2 };
cc_names[85]  = { param: "filter_mod_env", random: true };
cc_names[86]  = { param: "lfo1_delay", random: true, min:0, max:127 };
cc_names[87]  = { param: "lfo2_delay", random: true, min:0, max:127 };
cc_names[88]  = { param: "lfo1_wave", random: true, min:0, max:3 };
cc_names[89]  = { param: "lfo2_wave", random: true, min:0, max:3 };
cc_names[90]  = { param: "amp_env_A", random: true, min:0, max:127  };
cc_names[91]  = { param: "amp_env_D", random: true, min:0, max:127  };
cc_names[92]  = { param: "amp_env_S", random: true, min:0, max:127  };
cc_names[93]  = { param: "amp_env_R", random: true, min:0, max:127  };
cc_names[94]  = { param: "distortion", random: false };
cc_names[95]  = { param: "limiter", random: false };
cc_names[102] = { param: "mod_env_A", random: true, min:0, max:127  };
cc_names[103] = { param: "mod_env_D", random: true, min:0, max:127  };
cc_names[104] = { param: "mod_env_S", random: true, min:0, max:127  };
cc_names[105] = { param: "mod_env_R", random: true, min:0, max:127  };
cc_names[106] = { param: "m4l.filter.slope.input", random: true, min:0, max:1 };
cc_names[107] = { param: "pitch_bend_range", random: false };
cc_names[108] = { param: "arp_on", random: false };
cc_names[109] = { param: "arp_latch", random: true };
cc_names[110] = { param: "osc1_2_sync", random: true, min:0, max:1 };
cc_names[111] = { param: "arp_octaves", random: true };
cc_names[112] = { param: "amp_env_vel", random: true };
cc_names[113] = { param: "mod_env_vel", random: true };
cc_names[114] = { param: "filter_drive", random: true };
cc_names[115] = { param: "osc_filter_mod", random: true };
cc_names[116] = { param: "arp_swing", random: false };
cc_names[117] = { param: "keyboard_oct", random: false };
cc_names[118] = { param: "arp_mode", random: false };
cc_names[119] = { param: "arp_rhythm", random: false };

function send_cc(i, v) {
  var name = cc_names[i];
  if (name !== undefined) {
   
    switch(i) {
      case 70:
      case 75:
           // Fix for OSC1 and 2 range
        v = v - 63;
        break;
      case 81:
          // Sub oct output
          v = v -64;
        break;
      default:
        break;
    }

    messnamed(name.param, "set", v);
  } else {
    // post("Unknown CC index "+i);
  }
}

var nrpn_names  = new Array(107);
nrpn_names[70]  ={ param: "mod_wheel_lfo1_pitch", random: true };
nrpn_names[71]  ={ param: "mod_wheel_lfo2_filter", random: true, min: 0, max:127 };
nrpn_names[72]  ={ param: "m4l.osc1.waveform.input", random: true, min:0, max:3 };
nrpn_names[73]  ={ param: "triggering", random: false };
nrpn_names[74]  ={ param: "aftertouch_filter_freq", random: true };
nrpn_names[75]  ={ param: "aftertouch_lfo1_osc_pitch", random: true };
nrpn_names[76]  ={ param: "aftertouch_lfo2_speed", random: true };
nrpn_names[78]  ={ param: "mod_wheel_osc2_pitch", random: true };
nrpn_names[82]  ={ param: "m4l.osc2.waveform.input", random: true, min:0, max:3 };
nrpn_names[86]  ={ param: "lfo1_slew", random: false };
nrpn_names[87]  ={ param: "lfo1_speedsync", random: true };
nrpn_names[88]  ={ param: "lfo1_speed_mode", random: false };
nrpn_names[89]  ={ param: "lfo1_keysync", random: true, min:0, max:1 };
nrpn_names[90]  ={ param: "lfo2_slew", random: false };
nrpn_names[91]  ={ param: "lfo2_speedsync", random: true };
nrpn_names[92]  ={ param: "lfo2_speed_mode", random: false };
nrpn_names[93]  ={ param: "lfo2_keysync", random: true, min:0, max:1 };
nrpn_names[94]  ={ param: "mod_wheel_filter", random: true };
nrpn_names[105] ={ param: "mod_triggering", random: true, min:0, max:3 }; // Not implimented
nrpn_names[106] ={ param: "arp_seq_retrig", random: false };
// 64:28 input gain? 0->31
// 64:6  mastertune 0-63-127
// 64:4 midi channel

// only for randomness
var doubleccs = [
{param: "filter_freq", random:true, min: 0, max:255},
{param: "filter_freq_lfo2", random:true, min: 0, max:255},
{param: "mixer_osc1", random:false, min: 0, max:255},
{param: "mixer_osc2", random:true, min: 0, max:255},
{param: "mixer_sub", random:true, min: 0, max:255},
{param: "mixer_noise", random:false, min: 0, max:255},
{param: "mixer_ring", random:false, min: 0, max:255},
{param: "mixer_ext", random:false, min: 0, max:255},
{param: "osc2_lfo1_pitch", random:true, min: 0, max:255},
{param: "osc2_coarse", random:false, min: 0, max:255},
{param: "osc2_fine", random:false, min: 0, max:201},
{param: "osc1_lfo1_pitch", random:false, min: 0, max:255},
{param: "osc1_coarse", random:false, min: 0, max:255},
{param: "osc1_fine", random:false, min: 0, max:201},
{param: "lfo1_speed", random:true, min: 0, max:255},
{param: "lfo2_speed", random:true, min: 0, max:255},

];

// Send NRPN: Send NRPN index and value to output 1
function send_nrpn(i, v)
{
  var name = nrpn_names[i];
  if (name !== undefined) {
    messnamed(name.param, "set", v); 
  } else {
    post("Uknown NRPN index "+i);
  }
}

function riteration(params) {
  var i=0;
  for(i=0;i<params.length;i++){
    var param = params[i];
    if(param !== undefined && param.random && param.max) {
      var pname = param.param;
      var value = Math.round( (Math.random() * (param.max-param.min)) + param.min);
      messnamed(pname, value);
    }
  }
}

function random() {
  riteration(nrpn_names);
  riteration(cc_names);
  riteration(doubleccs);
}