
# How to use Manto

Manto uses qrcodes to transfer data between devices during the competition. There will be a device marked as "main" device and all scouters should show their generated qrcodes to the main device. It's recommended to choose a main device that has a good camera (main device will still be able to scout)

## Shortcuts

 - [Offline]()
 - [Main device]()
 - [Scouters]()
 - [Getting started]()

## Offline

Manto uses PWA to cache it's assets in the client's device so later it can be used without any network connectiviy

## Main device

Main device doesn't need to be anything special, it can be any type of device that can run the app and has a good camera for scanning qrcodes.

## Scouters

Scouters can use any device as long as they have a device with camrea and a browser

## Getting started

First of all you need to find your event code. This can be found at thebluealliance website under events

### Setting up the teams and schedule

- Go to https://www.thebluealliance.com/events
- Find your event and click on it
![part 2 image](https://i.ibb.co/0n5mD5V/1.png)
- Copy the code on the url bar
![part 3 image](https://i.ibb.co/N1nm141/2.png)
- Go to https://manto.team3161.ca and click on Admin
- At the admin page click on fetch and then paste the event code there
![part 5 image](https://i.ibb.co/LCZ7pg0/3.png)

![part 5.1 image](https://i.ibb.co/fQ5wgsD/4.png)

- For this operation you need internet access because the app tries to receive teams and the schedule from thebluealliance's api
- When it's done the page will be changed

### Setting up the properties

The next step is to setup the categories and properties for the scouters to fill in.

- First you need to open the Admin page and go to the categories section
![part 1](https://i.ibb.co/GdfXY5K/5.png)

- You need to click on new and you'll be redirected to the create page. Here you'll be asked to choose a name for the category
![part 2](https://i.ibb.co/KDypqL0/6.png)

- After creating the category you have to create properties for it. Click on new in the category you just made
![part 3](https://i.ibb.co/6rMymVX/7.png)

- Here you need to choose a **UNIQUE** title for the property and its type. Note that for options, you need to put the options in the title seperated by `|`, here's an example
![part 4](https://i.ibb.co/Yb889gK/8.png)

- Continue creating categories and their properties based on your needs.


## Authorizing scouters

In order for scouters to scout, they need to be authenticated. Here the main device needs to create an account for the scouters and let them scan the qrcode

- Go to the users section in admin page
- Click on new
![part 2](https://i.ibb.co/MgJqyxx/9.png)
- Choose a basic username and their preferred name
![part 3](https://i.ibb.co/kBQn4Kf/10.png)
- Click on `create` and then click on `qrcode` of the particular scouter
![part 4](https://i.ibb.co/PZj4Jr8/12.png)
- Let the scouter scan the qrcode when they're at the user authentication page
- Afterwards they will be redirected to the scouting page where they must scan teams and categories qrcodes


## Scouting

This part is for scouters.

- You will need to go to the schedule page and find your match. For example if you're scouting qualification match #11, you have to scroll down to number 11 and then choose your target team.
- Click on the target team and you'll be redirected to the scouting page.
- After you're done scouting, go to the `Queue` page.
- Here you have to choose the matches that you want to be transferred to the main device and then click on the qrcode
- Here the main device have to go to Admin -> Load Queue and then scan the qrcode that scouter has provided.