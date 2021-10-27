# js-mars-rover-kata

This is my solution to Mars Rover Kata. 

##  Key features of my solution

The program has been divided into four modules addressing separate concerns: 
* rovers_manager - Entry point to the program. Contains function manageRovers which accepts plateau's dimensions, rovers' positions and instructions as arguments, calls rover navigation function for each rover and returns new positions of all rovers.
* navigation - Contains functions for navigating a rover. Function navigateRover accepts plateau's dimensions, rover's position, instructions and a list of already occupied positions. It moves the rover to new position following the instructions and returns the new position. Function move is an auxiliary function used by navigateRover to update rover's coordinates.
* rovers_manager_validation - Contains functions validating manageRovers input arguments.
* navigation_validation - Contains functions validating navigateRovers input arguments and rovers' moves.

## My assumptions
* Only one rover can occupy each postion.
* We don't want rovers to fall of the surface of the plateau.
* We don't want rovers to clash.

## Approaches
* Input positions are checked for duplicates. If there are more than one rover on any position the program will throw an error.
* In case of rover instructions leading off the surface of the plateau or onto a position already occupied by a different rover the program will stop moving the rover, print out a warning and return the last possible position.
