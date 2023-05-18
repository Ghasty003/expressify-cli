function wait() {
    return new Promise((resolve) => {
      setTimeout(resolve, 1000);
    });
}
  
export default wait;
  