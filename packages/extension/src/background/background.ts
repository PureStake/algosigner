import { MessageApi } from './messaging/api';
class Wrapper {
  private static instance: Wrapper;
  public start() {
    MessageApi.listen();
  }
  public static getInstance(): Wrapper {
    if (!Wrapper.instance) {
      Wrapper.instance = new Wrapper();
    }
    return Wrapper.instance;
  }
}
const Background = Wrapper.getInstance();
export default Background;
