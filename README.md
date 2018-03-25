# react-placeholder
dynamic input placeholder component for React.js 



Getting started
---------------

If you're developing using npm and CommonJS modules:
```
npm i react-placeholder
```
```jsx
import reactplaceholder from 'react-placeholder';

<input
    ref = {"input"}
/>

reactplaceholder({
    el: ReactDOM.findDOMNode(this.refs.input),
    sentences: ['study physics', 'study chemistry', 'study mathematics', 'study biology'],
    options: {
        letterDelay: 100,
        loop: true,
        startOnFocus: false
    }
})

```

Don't see your prop? explaining your use case, and I will add it.

Packages Needed
---------------
* prop-types : ^15.5.4
* react : ^15.4.2
* react-dom : ^15.4.2

Testing
-------
on development

Issues
------
Please [file an issue](https://github.com/Anishmprasad/react-placeholder/issues) if you find a bug, or need help.


License
-------
The MIT License (MIT)
Copyright (c) 2018 Anish M Prasad