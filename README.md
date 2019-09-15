
# Iot/Node.js Developer Take-Home Challenge

Current repository demonstrates repeating pattern of asynchronous communication between a scientific hardware (e.g. scale) and a driver.

To run the demonstration open your terminal from this directory and run:
'''yarn'''
to install dependency [node-ipc](https://www.npmjs.com/package/node-ipc) module.

After installing run `node device.js`.
From new terminal window from the same directory run `node driver.js`.
In device terminal window you should see `## socket connection to server detected ##`

Now you can type commands in driver terminal window and send it with pushing enter.
Only valid command is S. Device will return a value.

Valid values are indicated with
--------------------------
--- Command recognized ---
--------------------------
