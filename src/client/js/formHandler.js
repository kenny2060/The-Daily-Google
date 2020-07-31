import nullStorySourceImg from '../img/wrecked-iphone.jpg'

async function handleSubmit(event) {
    event.preventDefault()
    console.log("::: Form Submitted :::")
    let local_section = document.getElementsByClassName('section-news')
    // check what text was put into the form field
    let formText = document.getElementById('name').value
    //Client.checkForName(formText)

    postUserNew('/userNews', { userInput: formText })
    // Post Data
    async function postUserNew(url = '', data = {}) {
        const res = await fetch(url, {
            method: 'POST',
            mode: 'cors',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
            .then(res => {
                // Check header status code
                if (res.status >= 200 && res.status < 300) {
                    return res.json()
                } else {
                    throw new Error('Network response not OK: ', res.statusText)
                }
            })
            .catch((error) => console.error('postData FETCH failed', error)
            )
            .then(data => updateUI(data))
    }

    // Update the UI with Users Results
    async function updateUI(data) {
        console.log('Called API data (updateUI): ', data)
        const userResults = document.querySelector('#user-results')
        try {
            userResults.innerHTML = ""
            for (var i = 0; i < data.length; i++) {
                const storyDiv = document.createElement('div')
                storyDiv.classList.add('local-results')
                storyDiv.id = data[i].id

                const storyImageWrapper = document.createElement('div')
                storyImageWrapper.id = 'local-story_img'

                const storyTextWrapper = document.createElement('div')
                storyTextWrapper.classList.add('local-results_text')

                const storyTitle = document.createElement('h2')
                storyTitle.id = 'local-story_title'
                const storyTitle_text = document.createTextNode(data[i].title)

                const storyPolarity = document.createElement('h4')
                storyPolarity.id = 'local-story_polarity'
                const storyPolarity_text = document.createTextNode(data[i].sentiment.body.polarity)

                const storySource = document.createElement('p')
                storySource.id = 'local-story_source'
                const storySource_text = document.createTextNode(data[i].source.name)

                storyTitle.append(storyTitle_text)
                storyPolarity.append(storyPolarity_text)
                storySource.append(storySource_text)

                storyTextWrapper.appendChild(storyTitle)
                storyTextWrapper.appendChild(storyPolarity)
                storyTextWrapper.appendChild(storySource)

                const storyImage = new Image(355, 200)
                if (data[i].media[0] != null) {
                    storyImage.src = data[i].media[0].url
                    storyImageWrapper.appendChild(storyImage)
                } else {
                    storyImage.src = nullStorySourceImg
                    storyImageWrapper.appendChild(storyImage)
                }

                storyDiv.appendChild(storyImageWrapper)
                storyDiv.appendChild(storyTextWrapper)
                userResults.insertAdjacentElement('beforeend', storyDiv)

            }
        } catch (error) {
            console.error('Error updating UI: ', error)
        }
    }
}

export { handleSubmit }