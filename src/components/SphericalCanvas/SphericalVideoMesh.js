import * as THREE from 'three';

class SphericalVideoMesh {
  constructor(video, name) {
    this.video = video;
    this.name = name;
    this.createMesh();
  }

  createMesh() {
    const geometry = new THREE.SphereBufferGeometry(500, 60, 40);
    geometry.scale(-1, 1, 1);
    const texture = new THREE.VideoTexture(this.video);
    const material = new THREE.MeshBasicMaterial({ map: texture });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.name = this.name;
  }
}
export default SphericalVideoMesh;
