<!-- Header -->
<div id="top" align="center">
  <br />

  <!-- Logo -->
  <img src="./website/src/assets/icon-inv.png" alt="Logo" width="200" height="200">

  <!-- Title -->
  ### HomeFront

  <!-- Description -->
  Offgrid Battery Monitor

  <!-- Repo badges -->
  [![Version](https://img.shields.io/badge/dynamic/json.svg?label=Version&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/homefront/tags&query=$[0].name)](https://git.zakscode.com/ztimson/homefront/tags)
  [![Pull Requests](https://img.shields.io/badge/dynamic/json.svg?label=Pull%20Requests&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/homefront&query=open_pr_counter)](https://git.zakscode.com/ztimson/homefront/pulls)
  [![Issues](https://img.shields.io/badge/dynamic/json.svg?label=Issues&style=for-the-badge&url=https://git.zakscode.com/api/v1/repos/ztimson/homefront&query=open_issues_count)](https://git.zakscode.com/ztimson/homefront/issues)

  <!-- Links -->

  ---
  <div>
    <a href="https://git.zakscode.com/ztimson/homefront/releases" target="_blank">Release Notes</a>
    • <a href="https://git.zakscode.com/ztimson/homefront/issues/new?template=.github%2fissue_template%2fbug.md" target="_blank">Report a Bug</a>
    • <a href="https://git.zakscode.com/ztimson/homefront/issues/new?template=.github%2fissue_template%2fenhancement.md" target="_blank">Request a Feature</a>
  </div>

  ---
</div>

## Table of Contents
- [HomeFront](#top)
    - [About](#about)
        - [Built With](#built-with)
    - [Setup](#setup)
        - [Development](#development)
    - [License](#license)

## About

<img src="./pictures/Resized_20181124_121520_5410.jpg" width="20%" height="auto"> <img src="./pictures/03e615d9-f1b3-4439-9341-185cd3c14f3f.jpg" width="20%" height="auto">

After obtaining 4 Tesla battery modules, I was contracted to build a device to record battery voltages & temperatures. This was accomplished using some custom circutry and
an arduino. These input values were then read by a Raspberry Pi & published to a web UI for remote viewing.

Later on the arduino was removed and the raspberry pi was directly interfaced with an upgraded Battery Charging Module which was able to read values directly from the batteries
onboard computer.

The code is split into two pieces:
 - Website for viewing data
 - Arduino & Raspberry Pi code to collect & publish battery data

### Built With
[![Angular](https://img.shields.io/badge/Angular-DD0031?style=for-the-badge&logo=angular)](https://angular.io/)
[![Arduino](https://img.shields.io/badge/Arduino-00878F?style=for-the-badge&logo=arduino&logoColor=white)](https://www.arduino.cc/)
[![Firebase](https://img.shields.io/badge/Firebase-FFFFFF?style=for-the-badge&logo=firebase)](https://firebase.google.com/)
[![Shell](https://img.shields.io/badge/Shell-000000?style=for-the-badge&logo=windowsterminal&logoColor=00ff00)](https://en.wikipedia.org/wiki/Shell_script)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)](https://typescriptlang.org/)

## Setup

<details>
<summary>
  <h3 id="development" style="display: inline">
    Development
  </h3>
</summary>

#### Prerequisites
- [Node.js](https://nodejs.org/en/download)

#### Instructions
1. Install the dependencies: `npm install`
2. Start the Angular server: `npm run start`
3. Open [http://localhost:4200](http://localhost:4200)

</details>

## License
Copyright © 2023 Zakary Timson | All Rights Reserved

See the [license](./LICENSE) for more information.
