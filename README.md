
# lz-ts-template

A template to quickly get up and running with a TypeScript project.

![Node.js CI](https://github.com/lzilioli/lz-ts-template/workflows/Node.js%20CI/badge.svg?branch=master)


# Table Of Contents

    -   [App Settings](#app-settings)

        -   [Defining settings](#defining-settings)

            -   [environment variables](#environment-variables)
            -   [`ConfigOverridesByEnv` + the `CONFIG_ENV` environment variable](#configoverridesbyenv--the-config_env-environment-variable)

    -   [Overview](#overview)

## App Settings

App settings are defined in settings.ts. Here, you will find the `SiteConfig` interface, which
defines all of the top-level settings your app can use. Right below that is the `defaultSettings` const,
which declares default settings for the app, when none other are defined.

```ts
export interface SiteConfig {
	analyticsEnabled: boolean;
	...
}

const defaultSettings: SiteConfig = {
	analyticsEnabled: false,
	...
};
```

### Defining settings

There are two ways to define settings yor your app:

#### environment variables

To override any config, simply specify the snake case, upper case version of the
argument as an environment variable.

e.g. to override the `analyticsEnabled` config, run the app with `ANALYTICS_ENABLED=true npm start`

#### `ConfigOverridesByEnv` + the `CONFIG_ENV` environment variable

It is convenient to not have to define all of the app's settings as environment variables when the app runs.
As an alternative, you can declare any environment you'd like in `ConfigOverridesByEnv`, and utilize those
settings when you run the app with `CONFIG_ENV=<env key>`.

At present, there is one env override provided, `production`.

```ts
const ConfigOverridesByEnv: {
	[key: string]: Partial<SiteConfig>;
} = {
	production: {
		excludePortFromURLs: true,
		host: 'www.example.com',
		protocol: 'https',
		port: 5050,
	}
};
```

To run the app using these configs, we would
use the command `CONFIG_ENV=production npm start`.

To load and use app settings in your app:s

```ts
import { SiteConfig, loadAppSettings } from '@server/settings';
const siteConfig: SiteConfig = loadAppSettings();
```

## Overview

- stands up an express app with handlebars partials directories
- stands up webpack build for client, server, requirable library, (TODO bin) and tests
- includes mocha tests
- includes gulp
- includes package scripts
