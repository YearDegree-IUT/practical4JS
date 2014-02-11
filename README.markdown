## Organisation

Repository is organised as follow:

```
├── bower.json              // bower dependencies
├── Gruntfile.js            // Build file
├── package.json            // npm dependencies
├── public                  // public files
│   ├── index.html
│   └── js
│       └── index.js
├── README.markdown
└── src                     // Application source
    ├── collections
    │   └── characters.js
    ├── config.js           // requirejs configuration
    ├── kernel.js           // main file
    ├── models
    │   └── character.js
    ├── router.js
    ├── templates
    │   ├── character.tpl
    │   └── form.tpl
    └── views
        ├── character.js
        └── form.js
```

## Commands

* `grunt dev` in dev mode
* `grunt release connect:release:keepalive` to release and view released code.

