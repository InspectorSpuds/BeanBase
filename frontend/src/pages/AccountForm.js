import './AccountForm.css'


function AccountForm(fields, title) {
  return (
    <form className={"LoginBox"}>
      <label>{title}</label>
      <div className={"LoginFields"}>
        {fields.map((item) => (
          <div className="LoginRow">
            <label>item.name</label>
            <br></br>
            <input type="text" id={it}></input>
          </div>
        ))}


      </div>
      <div className={"LoginActions"}>
      </div>
    </form>
  )
}

export default AccountForm;