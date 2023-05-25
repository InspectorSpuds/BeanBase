import './LoadScreen.css'

function LoadScreen() {
  return (
    <div className={"LoadSpinner"}>
      <h4 >Loading Post...</h4>
      <img src={require('./Spinner.png')} alt={"Loading..."}/>
    </div>
  );
}

export default LoadScreen;