# Deploy Source to Org without showing the Terminal

Deploy source to Salesforce Org and only show the Terminal if the deployment was unsuccessful.

## Overview

If you have a small screen or you don't want to close the terminal every time after a deploy (like me), 
you can deploy the source into Salesforce Org and just view the Terminal if the source has any error.

## Requirements

- Salesforce Project
- Authenticated Salesforce Org
- Opened file

## Features

For now you can deploy these metadata:

- Apex Class
- Apex Trigger
- LWC

## How to use it

With a file opened, use one of these methods:

1. Command Pallet option:

```
DWT: Deploy this Source to Org without Terminal
```

2. Right button on opened file:

```
DWT: Deploy this Source to Org without Terminal
```

3. Set a Keyboard Shortcut:

Code > Settings > Keyboard Shortcuts menu or use the Preferences: Open Keyboard Shortcuts

Set your preferred keyboard shortcut for option:

```
DWT: Deploy this Source to Org without Terminal
```

## Basic usage

Edit your source, save locally and then use one of the methods described on How to use it and wait for the response:

If there is error, the Terminal will be shown with the related errors;

If there is no error, nothing is showed;

Information messages will be displayed at the right bottom corner of VSCode.

## Release Notes

You can view all changes from [CHANGELOG](https://github.com/jvaloto/salesforce-deploy-without-terminal/blob/main/CHANGELOG.md) file

## Issues


Found a bug?
Please let me know by reporting issues on [GitHub issues.](https://github.com/jvaloto/salesforce-deploy-without-terminal/issues)

## Author

- Jonathan Valoto - [GitHub](https://github.com/jvaloto)