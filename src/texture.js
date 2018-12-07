import aio_f from './textures/aio/front.png';
import computer_f from './textures/computer/front.jpg';
import computer_b from './textures/computer/back.jpg';
import computer_k from './textures/computer/keyboard.png';
import computer_s from './textures/computer/side.jpg';
import host_f from './textures/host/front.jpg';
import host_b from './textures/host/back.jpg';
import host_t from './textures/host/top.jpg';
import host_s from './textures/host/side.jpg';
import node_f from './textures/node/front.jpg';
import node_t from './textures/node/top.jpg';
import node_b from './textures/node/back.jpg';
import node_s from './textures/node/side.jpg';
import laptop_f from './textures/laptop/front.jpg';
import laptop_t from './textures/laptop/top.jpg';
import txt_b from './textures/sign_b.png';


const aio={front:aio_f},computer={front:computer_f,back:computer_b,side:computer_s,keyboard:computer_k},
  host={front:host_f,back:host_b,side:host_s,top:host_t},
  node={front:node_f,back:node_b,side:node_s,top:node_t},
  laptop={front:laptop_f,top:laptop_t},
  sign={back:txt_b}



export {aio,computer,host,node,laptop,sign};