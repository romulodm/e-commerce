const ErrorMessage = ({Message, errorWidth, errorHeight, marginMessage}) => {

    return (
        <div style={{display: "flex", alignItems: "center", textAlign: "center", margin: marginMessage, height: errorHeight, width: errorWidth, backgroundColor: "#f8d7da", color: "#721c24", borderColor: "#721c24", borderRadius: "5px"}}>
            <div style={{textAlign: "center", flex: 1}}>{Message}</div>
        </div>
        )
};
  
export default ErrorMessage;