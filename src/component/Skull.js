// import * as THREE from 'three';
// import Model from '../Model'
// import GLTFLoader from 'three-gltf-loader';
//
// class Skull extends Model{
//   init(){
//     this.createMainCube();
//   }
//
//   /**
//    * 创建主体
//    */
//   createMainCube(){
//     // Instantiate a loader
//     const loader = new GLTFLoader();
//
//     loader.load(
//       // resource URL
//       './model/skull/scene.gltf',
//       // called when the resource is loaded
//       (gltf)=> {
//         gltf.scene.scale.set(5,5,5);
//         this.add(gltf.scene);
//
//         // gltf.animations; // Array<THREE.AnimationClip>
//         // gltf.scene; // THREE.Scene
//         // gltf.scenes; // Array<THREE.Scene>
//         // gltf.cameras; // Array<THREE.Camera>
//         // gltf.asset; // Object
//
//       },
//       // called while loading is progressing
//       function (xhr) {
//
//         console.log((xhr.loaded / xhr.total * 100) + '% loaded');
//
//       },
//       // called when loading has errors
//       function (error) {
//         console.error('error',error);
//
//       }
//     );
//   }
// }
//
// export default Skull