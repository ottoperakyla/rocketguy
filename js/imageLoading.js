const loadImage = ({id, url}) => new Promise((resolve, reject) => {
    const img = new Image()
    img.addEventListener('load', () => resolve([id, img]))
    img.addEventListener('error', (err) => reject(err))
    img.src = url
})

let imageMap = {}

let images = [
    {id: "playerDefault", url: "img/player_default.png"},
    {id: "playerFlying", url: "img/player_flying.png"},
    {id: "spikes", url: "img/spikes.png"}  
]

function imagesLoaded() {
    return Promise.all(images.map(loadImage))
}