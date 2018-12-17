import n_aio_f from './textures/aio/normal/front.png';
import a_aio_f from './textures/aio/alarm/front.png';
import a_aio_b from './textures/aio/alarm/back.png';
import w_aio_f from './textures/aio/warn/front.png';
import w_aio_b from './textures/aio/warn/back.png';
import n_computer_f from './textures/computer/normal/front.jpg';
import n_computer_b from './textures/computer/normal/back.jpg';
import n_computer_k from './textures/computer/normal/keyboard.png';
import n_computer_s from './textures/computer/normal/side.jpg';
import a_computer_f from './textures/computer/alarm/front.jpg';
import a_computer_b from './textures/computer/alarm/back.jpg';
import a_computer_k from './textures/computer/alarm/keyboard.png';
import a_computer_s from './textures/computer/alarm/side.jpg';
import w_computer_f from './textures/computer/warn/front.jpg';
import w_computer_b from './textures/computer/warn/back.png';
import w_computer_k from './textures/computer/warn/keyboard.png';
import w_computer_s from './textures/computer/warn/side.jpg';
import n_host_f from './textures/host/normal/front.jpg';
import n_host_b from './textures/host/normal/back.jpg';
import n_host_t from './textures/host/normal/top.jpg';
import n_host_s from './textures/host/normal/side.jpg';
import a_host_f from './textures/host/alarm/front.jpg';
import a_host_b from './textures/host/alarm/back.jpg';
import a_host_t from './textures/host/alarm/top.jpg';
import a_host_s from './textures/host/alarm/side.jpg';
import w_host_f from './textures/host/warn/front.jpg';
import w_host_b from './textures/host/warn/back.jpg';
import w_host_t from './textures/host/warn/top.jpg';
import w_host_s from './textures/host/warn/side.jpg';
import n_laptop_f from './textures/laptop/normal/front.jpg';
import n_laptop_k from './textures/laptop/normal/keyboard.jpg';
import a_laptop_f from './textures/laptop/alarm/front.jpg';
import a_laptop_k from './textures/laptop/alarm/keyboard.jpg';
import w_laptop_f from './textures/laptop/warn/front.jpg';
import w_laptop_k from './textures/laptop/warn/keyboard.jpg';
import n_node_f from './textures/node/normal/front.jpg';
import n_node_t from './textures/node/normal/top.jpg';
import n_node_b from './textures/node/normal/back.jpg';
import n_node_s from './textures/node/normal/side.jpg';
import a_node_f from './textures/node/alarm/front.jpg';
import a_node_t from './textures/node/alarm/top.jpg';
import a_node_b from './textures/node/alarm/back.jpg';
import a_node_s from './textures/node/alarm/side.jpg';
import w_node_f from './textures/node/warn/front.jpg';
import w_node_t from './textures/node/warn/top.jpg';
import w_node_b from './textures/node/warn/back.jpg';
import w_node_s from './textures/node/warn/side.jpg';

import txt_b from './textures/sign_b.png';
import arrow_t from './textures/arrow.png';


import Model from "./component/Model";

const loader = Model.loader.texture;
const load = function (img) {
  return loader.load(img)
};

const aio = {
  normal: {front: load(n_aio_f)},
  alarm: {front: load(a_aio_f),back:load(a_aio_b)},
  warn: {front: load(w_aio_f),back:load(w_aio_b)}
};
const computer = {
  normal: {front: load(n_computer_f), back: load(n_computer_b), side: load(n_computer_s), keyboard: load(n_computer_k)},
  alarm: {front: load(a_computer_f), back: load(a_computer_b), side: load(a_computer_s), keyboard: load(a_computer_k)},
  warn: {front: load(w_computer_f), back: load(w_computer_b), side: load(w_computer_s), keyboard: load(w_computer_k)},
};
const host = {
  normal: {front: load(n_host_f), back: load(n_host_b), side: load(n_host_s), top: load(n_host_t)},
  alarm: {front: load(a_host_f), back: load(a_host_b), side: load(a_host_s), top: load(a_host_t)},
  warn: {front: load(w_host_f), back: load(w_host_b), side: load(w_host_s), top: load(w_host_t)},
};
const node = {
  normal: {front: load(n_node_f), back: load(n_node_b), side: load(n_node_s), top: load(n_node_t)},
  alarm: {front: load(a_node_f), back: load(a_node_b), side: load(a_node_s), top: load(a_node_t)},
  warn: {front: load(w_node_f), back: load(w_node_b), side: load(w_node_s), top: load(w_node_t)},
};
const laptop = {
  normal: {front: load(n_laptop_f), keyboard: load(n_laptop_k)},
  alarm: {front: load(a_laptop_f), keyboard: load(a_laptop_k)},
  warn: {front: load(w_laptop_f), keyboard: load(w_laptop_k)}
};
const signBg = load(txt_b);
const arrowBg= load(arrow_t);


export {aio, computer, host, node, laptop, signBg,arrowBg};