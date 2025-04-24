const YearPickerDropdown =({ value , onChange , starYear=1980 , endYear= new Date().getFullYear(), name , className})=>{

    const years =[]
    for (let i=endYear; i >=starYear; i--){
        years.push(i)
    }
    return (
        <div style={{width:"300px"}}>
            <select className={className} name={name} value={value} onChange={onChange} required>
                <option value="">Select Year</option>
                {
                    years.map((year)=>{
                        return <option key={year} value={year}>{year}</option>
                    })
                }
            </select>
        </div>
    )
}

export default YearPickerDropdown