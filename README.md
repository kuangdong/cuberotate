#### install

```
npm install cuberotate --save
```

#### Usage

##### HTML content

```
<div class="box_rotate boxContainer">
    <ul>
        <li><img src="imageAddress"/></li>
        <li><img src="imageAddress"/></li>
        <li><img src="imageAddress"/></li>
        <li><img src="imageAddress"/></li>
    </lu>
</div>
```

##### javascript

```
import cubeRotate from 'cuberotate';
var options={direct:"v",autoPlay:true,transitionComplete:imgChagnedHandler}
var cube=new cubeRotate(".boxContainer",options);
function imgChangeHandler(imgIndex){
    console.info(“index=",imgIndex);
}
cube.next();
```

##### OPTIONS

| key                | defaultValue |                                                              |
| ------------------ | ------------ | ------------------------------------------------------------ |
| cubeNum            | 4            | image cube number                                            |
| autoPlay           | false        | Auto play or not                                             |
| playTime           | 4000         | Auto play time interval                                      |
| direct             | h            | image cube rotate direct that has two value(h or v)          |
| cubeRandom         | false        | image cube number Random generation                          |
| lowLeve            | false        | not 3D effect(Compatible with IE browser)                    |
| onReady            | null         | a callback function .This function is called after the images are loaded |
| transitionComplete | null         | a callback function. This function is called after the image is moved |

##### INTERFACE

```
1 cube.next();//Switch to the next image
2 cube.prev();//Switch to previous image
3 cube.setIndex(index);//Set index for toggle image
4 cube.setCubeNum(number);//Set the number of rotating blocks
5 cube.setCubeDirect(direct);//direct value is "h" or "v"
6 cube.getIndex();//return value is index
```

