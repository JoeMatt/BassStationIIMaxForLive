BassStationIIMaxForLive
=======================

A Max For Live patch to control and observe parameters on the Novation Bass Station 2

Max for Live UI by Joe Mattiello
Embedded original Bass Station 2 Max patch by Justin Foster 
http://cycling74.com/project/bass-station-ii-patch-editor/

![alt tag](https://raw.githubusercontent.com/JoeMatt/BassStationIIMaxForLive/master/Media/BS2Screenshot.png)


# Usage
1. Open BassStation2Router. This is necessary for getting SYSEX data to/from Ableton Live
2. Open the Max for Live patch

# Features
1. Live paramter editing
2. Patch switching with opional auto-ui update.

# Bugs / Unsupported
1. Not two way communitication. Parameter edits or patch changes made from the Bass Station 2 will not update the patch UI. Use "Patch Capture" to read the new values.
2. Some automation parameter title are incorrect