# iSignature
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Firwansyafani%2Fisignature.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Firwansyafani%2Fisignature?ref=badge_shield)


File extractor to get real extension of file given by checking through the file's signature

## Installation
Using NPM:

```vim
npm install isignature
```

Using Yarn:

```vim
yarn add isignature
```

## Usage

```js
const { getSignature } = require("isignature")
const somefile = require("./path/to/somefile.jpg")

const data = getSignature(somefile)
console.log(data)
```

## Response
| Property | Description | Example |
| -------- | ----------- | ------- |
| value | The exact match extension | `jpg` |
| possibility | The nearest match to your file | `['jpg', 'jpeg']` |
| match | The boolean answer if the given file is match | `true` |
| filehex | The short hex value of your file | `00 12 34 56 78` |


#### References

[signature.json](https://github.com/irwansyafani/isignature/blob/master/signatures.json)



## License
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Firwansyafani%2Fisignature.svg?type=large)](https://app.fossa.com/projects/git%2Bgithub.com%2Firwansyafani%2Fisignature?ref=badge_large)