// import { Random } from 'mockjs';
export default [
  {
    url: '/api/get',
    method: 'get',
    timeout: 500,
    response: ({ query }: any) => {
      // console.log('get:', query)
      return {
        code: 0,
        data: {
          name: 'get',
          time: +new Date()
        }
      };
    }
  },
  {
    url: '/api/post',
    method: 'post',
    timeout: 800,
    response: ({ body }: any) => {
      // console.log('post:', body)
      return {
        code: 0,
        data: {
          name: 'post'
        }
      };
    }
  },
  {
    url: '/api/post/err',
    method: 'post',
    timeout: 800,
    statusCode: 500,
    response: ({ body }: any) => {
      // console.log('post:', body)
      return {
        code: 9999,
        data: {
          name: 'err'
        },
        message: '请求发生未知错误'
      };
    }
  },
  // {
  //   url: '/api/text',
  //   method: 'post',
  //   rawResponse: async (req, res) => {
  //     let reqbody = '';
  //     await new Promise((resolve) => {
  //       req.on('data', (chunk) => {
  //         reqbody += chunk;
  //       });
  //       req.on('end', () => resolve(undefined));
  //     });
  //     res.setHeader('Content-Type', 'text/plain');
  //     res.statusCode = 200;
  //     res.end(`hello, ${reqbody}`);
  //   }
  // }
  {
    url: '/api/select',
    method: 'get',
    timeout: 1000,
    response: ({ query }: any) => {
      // console.log('get:', query)
      return {
        'code': 0,
        'data|10': [
          {
            'name': '@name',
            'value|+1': 0
          }
        ]
      };
    }
  }
];
