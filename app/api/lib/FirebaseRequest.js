class FirebaseRequest {
  online = false;

  constructor(request, postRequest, fallback) {
    this.request = request || this.request;
    this.postRequest = postRequest || this.postRequest;
    this.fallback = fallback || this.fallback;

    this.postRequest = this.postRequest.bind(this);
    this.request = this.request.bind(this);
    this.fallback = this.fallback.bind(this);

  }

  _checkNetwork() {
    this.online = navigator.onLine;
  }


  postRequest(res) {
    return res;
  }

  fallback() {
    console.log('no fallback');
  }

  request() {
    throw new Error('not implemented');
  }

  excute = (...arg) => {
    this._checkNetwork();
    this.requestArg = arg;
    if (this.online) {
      return this.request(...arg).then(this.postRequest);
    } else {
      return this.fallback();
    }
  }
}

export default FirebaseRequest;
