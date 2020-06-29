import * as THREE from 'three';

class SceneBuilder {
  constructor(width, height) {
    this.width = width;
    this.height = height;

    this.meshes = [];
    this.createScene();
    this.createCamera();
    this.createRenderer();
  }

  createScene() {
    const scene = new THREE.Scene();
    this.scene = scene;
  }

  createCamera() {
    const fieldOfView = 75;
    const aspectRatio = this.width / this.height;
    const near = 1;
    const far = 1000;

    this.camera = new THREE.PerspectiveCamera(fieldOfView, aspectRatio, near, far);
  }

  createRenderer() {
    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(this.width, this.height);

    this.renderer = renderer;
  }

  appendMesh(mesh) {
    this.meshes = [...this.meshes, mesh];
  }

  removeMeshByName(name) {
    this.meshes = this.meshes.filter((mesh) => mesh.name !== name);
  }

  update() {
    this.meshes.forEach((mesh) => {
      this.scene.add(mesh);
    });
    this.renderer.render(this.scene, this.camera);
  }

  resize(width, height) {
    this.width = width;
    this.height = height;

    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
    this.renderer.setSize(width, height);
  }
}

export default SceneBuilder;
