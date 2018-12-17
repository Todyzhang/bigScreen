
/**
 * 保存通用的THREE.js Object3D对象，需要使用时返回对象的副本，避免重复的new 对象
 * 使用方法：
 * 先用pushObject(sign,obj)保存对象，然后再用getObjectBySign(sign)
 */

const pool={};

function pushObject(sign,obj){
  pool[sign]=obj;
}
function getObjectBySign(sign){
  let obj=pool[sign];
  return obj&&obj.clone&&obj.clone();
}

// class Pool {
//   constructor(){
//     /**对象存放池。*/
//     this._pool={};
//   }
//
//   /**
//    * 保存对象
//    * @param sign
//    * @param obj
//    */
//   pushObject(sign,obj){
//     this._pool[sign]=obj;
//   }
//
//   /**
//    * 依sign得到对象副本
//    * @param sign
//    * @returns {*}
//    */
//   getObjectBySign(sign){
//     let obj=this._pool[sign];
//     return obj&&obj.clone&&obj.clone();
//   }



  // /**
  //  * 根据对象类型标识字符，获取对象池。
  //  * @param sign 对象类型标识字符。
  //  * @return 对象池。
  //  */
  // getPoolBySign(sign) {
  //   return this._pool[sign];
  // }
  //
  // /**
  //  * 清除对象池的对象。
  //  * @param sign 对象类型标识字符。
  //  */
  // clearBySign(sign){
  //   if (this._pool[sign]) this._pool[sign].length = 0;
  // }
  //
  // /**
  //  * 将对象放到对应类型标识的对象池中。
  //  * @param sign 对象类型标识字符。
  //  * @param item 对象。
  //  */
  // recover(sign, item) {
  //   /*[IF-FLASH]*/
  //   if (_inPoolDic[item]) return;
  //   /*[IF-FLASH]*/
  //   _inPoolDic[item] = true;
  //   //[IF-JS]if (item[InPoolSign]) return;
  //   //[IF-JS]item[InPoolSign] = true;
  //   this.getPoolBySign(sign).push(item);
  // }
  //
  // /**
  //  * <p>根据传入的对象类型标识字符，获取对象池中此类型标识的一个对象实例。</p>
  //  * <p>当对象池中无此类型标识的对象时，则根据传入的类型，创建一个新的对象返回。</p>
  //  * @param sign 对象类型标识字符。
  //  * @param cls 用于创建该类型对象的类。
  //  * @return 此类型标识的一个对象。
  //  */
  // getItemByClass(sign, cls) {
  //   let pool = this.getPoolBySign(sign);
  //   let rst = pool.length ? pool.pop() : new cls();
  //   /*[IF-FLASH]*/
  //   delete _inPoolDic[rst];
  //   //[IF-JS]rst[InPoolSign] = false;
  //   return rst;
  // }
  //
  // /**
  //  * <p>根据传入的对象类型标识字符，获取对象池中此类型标识的一个对象实例。</p>
  //  * <p>当对象池中无此类型标识的对象时，则使用传入的创建此类型对象的函数，新建一个对象返回。</p>
  //  * @param sign 对象类型标识字符。
  //  * @param createFun 用于创建该类型对象的方法。
  //  * @return 此类型标识的一个对象。
  //  */
  // getItemByCreateFun(sign, createFun) {
  //   var pool = getPoolBySign(sign);
  //   var rst = pool.length ? pool.pop() : createFun();
  //
  //   rst[InPoolSign] = false;
  //   return rst;
  // }
  //
  // /**
  //  * 根据传入的对象类型标识字符，获取对象池中已存储的此类型的一个对象，如果对象池中无此类型的对象，则返回 null 。
  //  * @param sign 对象类型标识字符。
  //  * @return 对象池中此类型的一个对象，如果对象池中无此类型的对象，则返回 null 。
  //  */
  // getItem(sign){
  //   var Array = getPoolBySign(sign);
  //   var rst = pool.length ? pool.pop() : null;
  //   if (rst) {
  //     /*[IF-FLASH]*/
  //     delete _inPoolDic[rst];
  //     //[IF-JS]rst[InPoolSign] = false;
  //   }
  //   return rst;
  // }

// }


export default {
  pushObject,getObjectBySign
};