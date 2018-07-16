let taskList = require('./taskList');
let axios = require('axios');
let R = require('ramda');

let init = async () => {
  let len = taskList.length;
  for (let i = 1; i < len; i++) {
    await handleZipCode(taskList[i]);
    console.log(`\n完成第${i}/${len}个邮编处理任务`);
  }
}

let handleZipCode = async item => {
  let {
    model
  } = await getZipCode(item);

  if (!R.isNil(model.postCode)) {
    let [zip_code] = model.postCode.sort((a, b) => a - b);
    await setVoteCount({
      zip_code,
      _id: item.id
    });
  }

  // 休眠
  let sleepTimeLength = (Math.random() * 1000).toFixed(0);
  console.log('休眠', sleepTimeLength, '毫秒');
  await sleep(sleepTimeLength);
}

let getZipCode = async params => await axios({
  url: 'http://www.ems.com.cn/ems/tool/rpq/queryPostCode',
  params
}).then(({
  data
}) => data)

/**
*   @database: { 微信开发 }
*   @desc:     { 更新邮编信息 } 
    const { zip_code, _id } = params;
*/
const setVoteCount = async params => await axios({
  url: 'http://api.cbpc.ltd/4/dc2861d656.json',
  params,
}).then(res => res);


// 随机休眠x秒
function sleep(ms = 1000) {
  return new Promise(r => setTimeout(r, ms));
}



init();