function minuteur() {
   const departMinutes = document.getElementById("input").value
    let temps = departMinutes * 60

    const timerElement = document.getElementById("timer")
    setInterval(() => {
        let minutes = parseInt(temps / 60, 10)
        let secondes = parseInt(temps % 60, 10)

        minutes = minutes < 10 ? "0" + minutes : minutes
        secondes = secondes < 10 ? "0" + secondes : secondes

        timerElement.innerText = `${minutes}:${secondes}`
        temps = temps <= 0 ? 0 : temps - 1
    }, 1000)
    console.log(timerElement)
    if (timerElement === "00:00") {
        document.getElementById("xyz").play()
    }
}





function arret() {
    document.getElementById('xyz').pause()
}