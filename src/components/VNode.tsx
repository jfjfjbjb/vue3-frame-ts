import { h } from 'vue';
interface VNodeType {
  node?: Function
}
function VNode(props: VNodeType, { slots, emit, attrs }: any) {
  return props.node ? props.node(h) : '';
}
export default VNode;
