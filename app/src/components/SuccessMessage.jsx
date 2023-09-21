const SuccessMessage = ({Message, successWidth, successHeight, marginMessage}) => {

    return (
        <div style={{display: "flex", alignItems: "center", textAlign: "center", margin: marginMessage, height: successHeight, width: successWidth, backgroundColor: "#d7f8d9", color: "#2a791a", borderColor: "#acffa8", borderRadius: "5px"}}>
            <div style={{textAlign: "center", flex: 1}}>{Message}</div>
        </div>
        )
};
  
export default SuccessMessage ;