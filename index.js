const createEmployeeRecord= (employeeArray)=>{
    const employeeRecord = {
        'firstName':employeeArray[0],
        'familyName': employeeArray[1],
        'title':employeeArray[2],
        'payPerHour':employeeArray[3],
        'timeInEvents':[],
        'timeOutEvents':[]
    }
    return employeeRecord
}

const createEmployeeRecords = (employeeArrays)=>{
    return employeeArrays.map((empArray)=>createEmployeeRecord(empArray))
}

const createTimeInEvent = (employee,dateStamp)=>{
    let [date, hour] = dateStamp.split(' ')
    const newTimeIn = {
        'type':'TimeIn',
        'hour': parseInt(hour, 10),
        date
    }
    employee.timeInEvents.push(newTimeIn)
    return employee
}

const createTimeOutEvent = (employee, dateStamp)=>{
    let [date, hour] = dateStamp.split(' ')
    const newTimeOut={
        'type': 'TimeOut',
        'hour': parseInt(hour, 10),
        date
    }
    employee.timeOutEvents.push(newTimeOut)
    return employee
}

const hoursWorkedOnDate = (employee, dateLookup)=>{
    let inEvent = employee.timeInEvents.find((e)=>{return e.date === dateLookup})
    let outEvent = employee.timeOutEvents.find((e) => { return e.date === dateLookup })

    return (outEvent.hour-inEvent.hour)/100
}

const wagesEarnedOnDate = (employee, dateLookup)=>{
    let wages = hoursWorkedOnDate(employee, dateLookup)*employee.payPerHour
    return wages
}

const allWagesFor = (employee)=>{
    let eligibleDates = employee.timeInEvents.map(function (e) {
        return e.date
    })

    let payable = eligibleDates.reduce(function (memo, d) {
        return memo + wagesEarnedOnDate(employee, d)
    }, 0)

    return payable
    // let total = 0
    // employee.timeOutEvents.map((timeOut)=>total += wagesEarnedOnDate(employee,timeOut))
    // return total
}

const calculatePayroll = (employeeRecords)=>{
    return employeeRecords.reduce(function (memo, rec) {
        return memo + allWagesFor(rec)
    }, 0)
    // let totalPayroll = 0
    // employeeRecords.map((employee)=>total+= allWagesFor(employee))
    // return totalPayroll
}