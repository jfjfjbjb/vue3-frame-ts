import common from './common';
import component from './component';

function resolveModules(modules: any) {
  // console.log(modules);
  const comps: any[] = [];

  // 异步写法
  // for (const key in modules) {
  //   modules[key]().then((mod: any) => {
  //     const nameMatch = key.match(/^\.\/([\s\S]+)\/.+/);
  //     const _key = nameMatch != null ? nameMatch[1] : '';
  //     comps.push({
  //       key: _key,
  //       name: _key,
  //       comp: mod.default
  //     });
  //   });
  // }

  // 同步写法
  for (const key in modules) {
    const nameMatch = key.match(/^\.\/([\s\S]+)\/.+/);
    const _key = nameMatch != null ? nameMatch[1] : '';
    comps.push({
      key: _key,
      name: _key,
      comp: (modules[key] as any).default
    });
  }
  return comps;
}

export default {
  common: resolveModules(common),
  component: resolveModules(component)
};
