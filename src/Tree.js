import React from 'react';
import * as THREE from 'three';

export default class Three extends React.Component {

  /**
   * Constructor
   */
  constructor(props) {
    super(props);

    this.state = {
      width: window.innerWidth / 2,
      height: window.innerHeight / 2
    }
  }

  /**
   * Rendering
   */
  render() {
    return (
      <div className='three' ref={(el) => { this.three = el }}></div>
    );
  }

  /**
   * Initialization
   */
  componentDidMount() {
    this.updateDimensions();
    window.addEventListener("resize", this.updateDimensions.bind(this));

    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);

    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.three.appendChild(this.renderer.domElement);

    this.directionalLight = new THREE.DirectionalLight(0x9090aa);
    this.directionalLight.position.set(-10, 10, -10).normalize();
    this.scene.add(this.directionalLight);

    this.hemisphereLight = new THREE.HemisphereLight(0xffffff, 0x444444);
    this.hemisphereLight.position.set(1, 1, 1);
    this.scene.add(this.hemisphereLight);

    // this.geometry = new THREE.BoxGeometry(1, 1, 1);
    this.geometry = new THREE.CylinderGeometry( 1, 1, 1, 16 );
    this.material = new THREE.MeshStandardMaterial({ color: 0x00ff00, metalness: 0.15 });
    this.cube = new THREE.Mesh(this.geometry, this.material);
    this.scene.add(this.cube);

    // var geometry = new THREE.CylinderGeometry( 5, 5, 20, 32 );
    // var material = new THREE.MeshBasicMaterial( {color: 0xffff00} );
    // var cylinder = new THREE.Mesh( geometry, material );
    // this.scene.add( cylinder );

    this.camera.position.z = 5;

    this.cube.rotation.x = 0.5;
    this.cube.rotation.y = 0;

    this.animate();
  }

  /**
   * Animation loop
   */
  animate() {
    requestAnimationFrame(this.animate.bind(this));
    // console.log(this.props.radius)
    // this.cube.rotation.x += 0.01
    // this.cube.rotation.z += 0.01

    this.cube.scale.set(this.props.radius / 3, this.props.height / 3, this.props.radius / 3)

    // this.cube.scale.x = this.props.radius / 3
    // this.cube.scale.y = this.props.radius / 3
    // this.cube.scale.z = this.props.height / 3
    this.renderer.render(this.scene, this.camera);
  }

  /**
   * Resize operation handler, updating dimensions.
   * Setting state will invalidate the component
   * and call `componentWillUpdate()`.
   */
  updateDimensions() {
    this.setState({
      width: window.innerWidth,
      height: window.innerHeight
    });
  }

  /**
   * Invalidation handler, updating layout
   */
  componentWillUpdate() {
    let width = window.innerWidth / 2;
    let height = window.innerHeight / 2;

    this.renderer.setSize(width, height);
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  /**
   * Dispose
   */
  componentWillUnmount() {
    window.removeEventListener("resize", this.updateDimensions.bind(this));
  }

}
