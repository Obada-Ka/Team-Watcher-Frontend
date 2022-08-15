export default class ErrorService {
  handleMsgsError(errors: any) {
    let errorMsgs = {};
    const errorKeys = Object.keys(errors);
    errorKeys.forEach((erKey: any) => {
      const msg = {
        [erKey]: (errors[erKey] as any).join("\r\n"),
      };
      errorMsgs = Object.assign(errorMsgs, msg);
    });
    return errorMsgs;
  }
}
