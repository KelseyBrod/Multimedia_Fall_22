import * as THREE from 'three'
import { FontLoader } from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/FontLoader.js'
import { TextGeometry } from 'https://unpkg.com/three@0.146.0/examples/jsm/geometries/TextGeometry.js'
import { OBJLoader } from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/OBJLoader.js'
import { MTLLoader } from 'https://unpkg.com/three@0.146.0/examples/jsm/loaders/MTLLoader.js'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Lights
const ambientLight = new THREE.AmbientLight(0xffffff, 0.6)
scene.add(ambientLight)

const directionalLight = new THREE.DirectionalLight(0xD3EDFF, 5)
directionalLight.castShadow = true
directionalLight.shadow.mapSize.set(1024, 1024)
directionalLight.shadow.camera.near = 0
directionalLight.shadow.camera.far = 13
directionalLight.shadow.camera.left = - 5
directionalLight.shadow.camera.top = 5
directionalLight.shadow.camera.right = 5
directionalLight.shadow.camera.bottom = - 5
directionalLight.position.set(0, 0, 2)
scene.add( directionalLight.target )
const targetObject = new THREE.Object3D()
scene.add(targetObject)
directionalLight.target = targetObject
scene.add(directionalLight)

// Light Helper
// const directionalLightCameraHelper = new THREE.CameraHelper(directionalLight.shadow.camera)
// scene.add(directionalLightCameraHelper)

// Cursor
const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener('mousemove', (event) =>
{
   cursor.x = event.clientX / sizes.width - 0.5
   cursor.y = event.clientY / sizes.height - 0.5
})

// Objects
// Font
const fontLoader = new FontLoader()
const objectsDistance = 4
fontLoader.load(
    '../fonts/Retro Gaming_Regular.json',
    (font) =>
    {
       const materialOne = new THREE.MeshBasicMaterial( { color: "blue" })
       const materialTwo = new THREE.MeshBasicMaterial( { color: "white", wireframe: true })
       const materialArray = [ materialOne, materialTwo];
       const textGeometry = new TextGeometry(
           "HAOCHEN",
           {
               font: font,
               size: 0.5,
               height: 0.2,
               curveSegments: 6,
               bevelEnabled: true,
               bevelThickness: 0,
               bevelSize: 0.01,
               bevelOffset: 0,
               bevelSegments: 12
           }
       )
       const text = new THREE.Mesh(textGeometry, materialArray)
       text.position.y = - objectsDistance * 0
       scene.add(text)
       textGeometry.center()

       const clock = new THREE.Clock()

       const tick = () =>
       {
            const elapsedTime = clock.getElapsedTime()

            const parallaxX = - cursor.x
            const parallaxY = cursor.y
            text.position.x = parallaxX
            text.position.y = parallaxY
            text.rotation.x = parallaxX * Math.PI * 0.4
            text.rotation.y = - parallaxY * Math.PI * 0.4

            window.requestAnimationFrame(tick)
        }

        tick()
    }
)

// Treasure Box
const mtlLoaderOne = new MTLLoader()
mtlLoaderOne.load(
    '../models/AncientTreasure/AncientTreasure.mtl',
    (materials) => {
        materials.preload()

        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load(
            '../models/AncientTreasure/AncientTreasure.obj',
            (object) => {
                object.traverse(function(child){child.castShadow = true;})
                object.traverse(function(child){child.receiveShadow = true;})
                object.position.x = -2
                object.position.y = - objectsDistance * 1 - object.scale.y * 0.5
                object.scale.x = 0.7
                object.scale.y = 0.7
                object.scale.z = 0.7
                scene.add(object)

                const clock = new THREE.Clock()

                const tick = () =>
                {
                     const elapsedTime = clock.getElapsedTime()
         
                     object.rotation.y = elapsedTime * 0.2
         
                     window.requestAnimationFrame(tick)
                 }
         
                 tick()
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log('An error happened')
            }
        )
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log('An error happened')
    }
)

// Temple
const mtlLoaderTwo = new MTLLoader()
mtlLoaderTwo.load(
    '../models/AncientTemple/AncientTemple.mtl',
    (materials) => {
        materials.preload()

        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load(
            '../models/AncientTemple/AncientTemple.obj',
            (object) => {
                object.traverse(function(child){child.castShadow = true;})
                object.traverse(function(child){child.receiveShadow = true;})
                object.position.x = 1.9
                object.position.y = - objectsDistance * 2 - object.scale.y * 0.7
                object.scale.x = 0.5
                object.scale.y = 0.5
                object.scale.z = 0.5
                scene.add(object)

                const clock = new THREE.Clock()

                const tick = () =>
                {
                     const elapsedTime = clock.getElapsedTime()
         
                     object.rotation.y = - elapsedTime * 0.2
         
                     window.requestAnimationFrame(tick)
                 }
         
                 tick()
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log('An error happened')
            }
        )
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log('An error happened')
    }
)

// Ship
const mtlLoaderThree = new MTLLoader()
mtlLoaderThree.load(
    '../models/PyramidShips/PyramidShips.mtl',
    (materials) => {
        materials.preload()

        const objLoader = new OBJLoader()
        objLoader.setMaterials(materials)
        objLoader.load(
            '../models/PyramidShips/PyramidShips.obj',
            (object) => {
                object.traverse(function(child){child.castShadow = true;})
                object.traverse(function(child){child.receiveShadow = true;})
                object.position.x = -1.8
                object.position.y = - objectsDistance * 3 - object.scale.y * 1.2
                object.scale.x = 0.45
                object.scale.y = 0.45
                object.scale.z = 0.45
                scene.add(object)

                const clock = new THREE.Clock()

                const tick = () =>
                {
                     const elapsedTime = clock.getElapsedTime()
         
                     object.rotation.y = elapsedTime * 0.2
         
                     window.requestAnimationFrame(tick)
                 }
         
                 tick()
            },
            (xhr) => {
                console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
            },
            (error) => {
                console.log('An error happened')
            }
        )
    },
    (xhr) => {
        console.log((xhr.loaded / xhr.total) * 100 + '% loaded')
    },
    (error) => {
        console.log('An error happened')
    }
)

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

// Camera Group
const cameraGroup = new THREE.Group()
scene.add(cameraGroup)

// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.shadowMap.enabled = true
renderer.shadowMap.type = THREE.PCFSoftShadowMap
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

// Scroll
let scrollY = window.scrollY
window.addEventListener('scroll', () =>
{
    scrollY = window.scrollY
})

// Animate

const tick = () =>
{
    // Move camera and light
    camera.position.y = - scrollY / sizes.height * objectsDistance
    directionalLight.position.y = - scrollY / sizes.height * objectsDistance + 1
    targetObject.position.y = - scrollY / sizes.height * objectsDistance

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()