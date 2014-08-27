BassStationIIMaxForLive
=======================

A Max For Live patch to control and observe parameters on the Novation Bass Station 2

Max for Live UI by Joe Mattiello
Embedded original Bass Station 2 Max patch by Justin Foster 
http://cycling74.com/project/bass-station-ii-patch-editor/

![alt tag](https://raw.githubusercontent.com/JoeMatt/BassStationIIMaxForLive/master/Media/BS2Screenshot.png)


# Usage
1. Open BassStation2Router with either full Max or the free Max runtime. A standalone binary for OS X is also available. This is necessary for getting SYSEX data to/from Ableton Live
2. Open the Max for Live patch in Live

# Features
1. Live paramter editing
2. UI updates with hardware changes (optional)
3. Randomize (some) parameters.
4. Program change with opional auto-ui update.
5. Fullscreen popout editor

# Bugs / Unsupported
1. Some automation parameter title are incorrect
2. Randomize can be a little glitchy for some parameters.
3. The fullscreen popout editor MAY not always see edits made from Random or on the BS2 hardware.


# TODO
* Patch Banks
* Load SYSEX patch drag & drop
* Capture incoming patches to SYSEX files
* Fix all automation paramter titles
* Radomize parameter lock
* 
# Log

V 1.1
Added
1. Incoming CC data updates the UI
2. Random Feature
3. CC from Live or helper router
4. Fullscreen popup editor

Fixes
1. More reliable router app
2. UI layout tweaks
3. Automation fixes for some parameters
4. Speed in Beats is native M4L selector

V 1.0 - Initial release
