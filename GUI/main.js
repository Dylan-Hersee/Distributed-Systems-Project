let eventsData = [];
async function showTargets(){
    try{
        const response = await fetch('/api/Targets')
        const result = await response.json()
        const data = result.targets

        const print = document.getElementById("main-goal")
        print.innerHTML = ''

        for(let i = 0; i < data.length; i++){
            const target = document.createElement('div')
            target.classList.add('target-item')

            let indicatorHTML = ''
            for(let j = 0; j < data[i].indicators.length; j++){
                indicatorHTML += `
                    <li>
                        <strong>${data[i].indicators[j]}</strong> 
                        - ${data[i].indicatorDesc[j]}
                    </li>`
            }

            target.innerHTML = `
                <h3>Target ${data[i].targetId}</h3>
                <p>${data[i].targetDesc}</p>
                <button onclick="toggleIndicators('indicators-${i}', this)">
                    Show Indicators
                </button>
                <ul id="indicators-${i}" class="indicators-list hidden">
                    ${indicatorHTML}
                </ul>
                <button onclick="progressTracker('${data[i].targetId}', '')">
                    View Progress
                </button>
                <div id="progress"></div>
                <hr>`

            print.appendChild(target)
        }
    } catch(e){
        console.error("Error fetching targets:", e)
    }
}

function toggleIndicators(id, btn){
    const list = document.getElementById(id)
    if(list.classList.contains('hidden')){
        list.classList.remove('hidden')
        btn.textContent = 'Hide Indicators'
    } else {
        list.classList.add('hidden')
        btn.textContent = 'Show Indicators'
    }
}

function progressTracker(targetId, country){
    const progress = document.getElementById("progress")
    progress.innerHTML = ''

    if(targetId === "9.2"){
        document.getElementById("countryInputContainer").hidden = false
        country = document.getElementById("countryInput").value || ''
    } else {
        document.getElementById("countryInputContainer").hidden = true
    }

    const eventSource = new EventSource(`/api/progress/${targetId}?country=${country}`)

    eventSource.onmessage = function(e){
        const data = JSON.parse(e.data)

        if(data.type === 'end'){
            eventSource.close()
            return
        }

        if(data.error){
            progress.innerHTML = `<p>Error: ${data.error}</p>`
            eventSource.close()
            return
        }

        if(targetId === "9.1"){
            progress.innerHTML = `
            <h2>Progress for Target 9.1</h2>
            <ul>
                <li><strong>Residential Property:</strong> ${data.residProperty}</li>
                <li><strong>Commercial Property:</strong> ${data.comProperty}</li>
                <li><strong>Total:</strong> ${data.total}</li>
                <li><strong>Target Goal:</strong> ${data.targetGoal}</li>
                <li><strong>Progress:</strong> ${data.progressPercent}%</li>
                <li><strong>Status:</strong> ${data.onTrack ? "On Track" : "Off Track"}</li>
            </ul>`
        }
        else if(targetId === "9.2"){
            progress.innerHTML = `
            <h2>Progress for Target 9.2</h2>
            <ul>
                <li><strong>Country:</strong> ${country}</li>
                <li><strong>Manufacturing Employment Rate:</strong> ${data.employmentRate}%</li>
                <li><strong>Target Employment Rate:</strong> ${data.targetRate}%</li>
                <li><strong>Employment Status:</strong> ${data.onTrack ? "On Track" : "Off Track"}</li>
                <li><strong>GDP Contribution:</strong> ${data.GDPContribution}%</li>
                <li><strong>Previous GDP Contribution:</strong> ${data.prevGDPContribution}%</li>
                <li><strong>GDP Status:</strong> ${data.gdpOnTrack ? "Improving" : "Declining"}</li>
            </ul>`
        }
        else if(targetId === "9.3"){
            progress.innerHTML = `
            <h2>Progress for Target 9.3</h2>
            <ul>
                <li><strong>Small-Scale Industry Value Added:</strong> ${data.smallIndustryValue}</li>
                <li><strong>Total Industry Value Added:</strong> ${data.totalIndustryValue}</li>
                <li><strong>Small-Scale Industry Indicator:</strong> ${data.ssiIndicator}%</li>
                <li><strong>Credit Access:</strong> ${data.creditAccess}%</li>
                <li><strong>Target Credit Access:</strong> ${data.targetCredit}%</li>
                <li><strong>Target SSI Indicator:</strong> ${data.targetSSI}%</li>
                <li><strong>Status:</strong> ${data.onTrack ? "On Track" : "Off Track"}</li>
            </ul>`
        }
        else if(targetId === "9.4"){
            progress.innerHTML = `
            <h2>Progress for Target 9.4</h2>
            <ul>
                <li><strong>Total Industries:</strong> ${data.totalIndusties}</li>
                <li><strong>Industries with Cleaner Tech:</strong> ${data.addedSustainable}</li>
                <li><strong>Sustainable Industry Indicator:</strong> ${data.sustainableIndicator}%</li>
                <li><strong>Target Sustainable Indicator:</strong> ${data.targetSustainable}%</li>
                <li><strong>CO2 Emission per Unit:</strong> ${data.co2Emission} CO2</li>
                <li><strong>Target CO2 Emission:</strong> ${data.targetEmission} CO2</li>
                <li><strong>Status:</strong> ${data.onTrack ? "On Track" : "Off Track"}</li>
            </ul>`
        }
        else if(targetId === "9.5"){
            progress.innerHTML = `
            <h2>Progress for Target 9.5</h2>
            <ul>
                <li><strong>R&D Expenditure as % of GDP:</strong> ${data.ResearchBudgetPercent}%</li>
                <li><strong>Target R&D Expenditure:</strong> ${data.targetBudgetPercent}%</li>
                <li><strong>Researchers per Million:</strong> ${data.researchersPerMillion}</li>
                <li><strong>Target Researchers per Million:</strong> ${data.targetResearchers}</li>
                <li><strong>Status:</strong> ${data.onTrack ? "On Track" : "Off Track"}</li>
            </ul>`
        }
        else if(targetId === "9.a"){
            progress.innerHTML = `
            <h2>Progress for Target 9.a</h2>
            <ul>
                <li><strong>Private Investment:</strong> ${data.privateInvestment}%</li>
                <li><strong>Public Investment:</strong> ${data.publicInvestment}%</li>
                <li><strong>Total Investment:</strong> ${data.totalInvestment}%</li>
                <li><strong>Target Investment:</strong> ${data.targetInvestment}%</li>
                <li><strong>Technology Sales to LDCs:</strong> ${data.techSales}%</li>
                <li><strong>Target Tech Sales:</strong> ${data.targetTechSales}%</li>
                <li><strong>Infrastructure Indicator:</strong> ${data.infrastructureInvestmentIndicator}</li>
                <li><strong>Status:</strong> ${data.onTrack ? "On Track" : "Off Track"}</li>
            </ul>`
        }
        else if(targetId === "9.b"){
            progress.innerHTML = `
            <h2>Progress for Target 9.b</h2>
            <ul>
                <li><strong>Dependency Percentage:</strong> ${data.dependencyPercent}%</li>
                <li><strong>Target Dependency:</strong> ${data.targetDependency}%</li>
                <li><strong>High Tech Industry Value:</strong> ${data.highTechValuePercent}%</li>
                <li><strong>Target High Tech Value:</strong> ${data.targetHighTech}%</li>
                <li><strong>Status:</strong> ${data.onTrack ? "On Track" : "Off Track"}</li>
            </ul>`
        }
        else{
            progress.innerHTML = `
            <h2>Progress for Target 9.c</h2>
            <ul>
                <li><strong>5G Masts Built:</strong> ${data.fivGMastsBuilt.toLocaleString()}</li>
                <li><strong>Target Masts:</strong> ${data.targetMasts.toLocaleString()}</li>
                <li><strong>Total KM Covered:</strong> ${data.kmCovered.toLocaleString()} km</li>
                <li><strong>Target KM Coverage:</strong> ${data.targetKm.toLocaleString()} km</li>
                <li><strong>People Within Range:</strong> ${data.peopleInRange.toLocaleString()}</li>
                <li><strong>Target People in Range:</strong> ${data.targetPeople.toLocaleString()}</li>
                <li><strong>Status:</strong> ${data.onTrack ? "On Track" : "Off Track"}</li>
            </ul>`
        }
    }

    eventSource.onerror = function(){
        progress.innerHTML = '<p>Error connecting to Progress Service</p>'
        eventSource.close()
    }
}

async function displayEvents(){
    try{
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({})
        })
        const result = await response.json()
        eventsData = result.events

        eventsData.sort((a, b) => new Date(a.Date) - new Date(b.Date))

        for(let i = 0; i < 5; i++){
            const card = document.getElementById(`card${i+1}`)
            if(eventsData[i]){
                card.innerHTML = `
                    <h3>${eventsData[i].Event}</h3>
                    <p>Date: ${eventsData[i].Date}</p>
                    <p>Location: ${eventsData[i].Location}</p>
                    <p>Duration: ${eventsData[i].duration}</p>
                    <p>Accessibility: ${eventsData[i].access}</p>
                `
            } else {
                card.innerHTML = '<p>No event</p>'
            }
        }
    } catch(e){
        console.error("Error fetching events:", e)
    }
}

async function Events(){
    const event = document.getElementById("eventSelect").value
    const date = document.getElementById("eventDate").value
    const location = document.getElementById("eventLocation").value
    const email = document.getElementById("email").value

    if(!event || !date || !location || !email){
        alert("Please fill in all fields.")
        return
    }

    try{
        const response = await fetch('/api/events', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({ targetId: event, date, location, email })
        })
        const result = await response.json()
        eventsData = result.events

        for(let i = 0; i < 5; i++){
            const card = document.getElementById(`card${i+1}`)
            if(eventsData[i]){
                card.innerHTML = `
                    <h3>${eventsData[i].Event}</h3>
                    <p>Date: ${eventsData[i].Date}</p>
                    <p>Location: ${eventsData[i].Location}</p>
                    <p>Duration: ${eventsData[i].duration}</p>
                    <p>Accessibility: ${eventsData[i].access}</p>
                `
            }
        }
    } catch(e){
        console.error("Error submitting event interest:", e)
    }
}

// Binary search by date
function binarySearch(events, targetDate){
    let left = 0
    let right = events.length - 1

    while(left <= right){
        const mid = Math.floor((left + right) / 2)
        const midDate = events[mid].Date

        if(midDate === targetDate) return events[mid]
        else if(midDate < targetDate) left = mid + 1
        else right = mid - 1
    }
    return null
}

function searchEvent(){
    const targetDate = document.getElementById('dateSearch').value
    const searchResult = document.getElementById('searchResult')

    if(!targetDate){
        searchResult.innerHTML = '<p>Please select a date</p>'
        return
    }

    const result = binarySearch(eventsData, targetDate)

    if(result){
        searchResult.innerHTML = `
            <h3>${result.Event}</h3>
            <p>Date: ${result.Date}</p>
            <p>Location: ${result.Location}</p>
            <p>Duration: ${result.duration}</p>
            <p>Accessibility: ${result.access}</p>
        `
    } else {
        searchResult.innerHTML = `<p>No event found for ${targetDate}</p>`
    }
}

function filterByLocation(){
    const location = document.getElementById('locationSearch').value.toLowerCase()
    const filtered = eventsData.filter(e =>
        e.Location.toLowerCase().includes(location)
    )

    for(let i = 0; i < 5; i++){
        const card = document.getElementById(`card${i+1}`)
        if(filtered[i]){
            card.innerHTML = `
                <h3>${filtered[i].Event}</h3>
                <p>Date: ${filtered[i].Date}</p>
                <p>Location: ${filtered[i].Location}</p>
                <p>Duration: ${filtered[i].duration}</p>
                <p>Accessibility: ${filtered[i].access}</p>
            `
        } else {
            card.innerHTML = '<p>No event</p>'
        }
    }
}
