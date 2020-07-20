import nullStorySourceImg from '../img/wrecked-iphone.jpg'

async function handleSubmit(event) {
    event.preventDefault()
    console.log("::: Form Submitted :::")
        // check what text was put into the form field
    let formText = document.getElementById('name').value
        //Client.checkForName(formText)

    getStoriesRes()

    async function getStoriesRes() {
        let local_section = document.getElementsByClassName('section-news')[0]

        const apiResponse = await fetch('/localNews')
        try {
            const storyData = await apiResponse.json();
            for (var i = 0; i < storyData.length; i++) {
                const storyDiv = document.createElement('div')
                storyDiv.classList.add('local-results')
                storyDiv.id = storyData[i].id

                const storyImageWrapper = document.createElement('div')
                storyImageWrapper.id = 'local-story_img'

                const storyTextWrapper = document.createElement('div')
                storyTextWrapper.classList.add('local-results_text')

                const storyTitle = document.createElement('h2')
                storyTitle.id = 'local-story_title'
                const storyTitle_text = document.createTextNode(storyData[i].title)

                const storySource = document.createElement('p')
                storySource.id = 'local-story_source'
                const storySource_text = document.createTextNode(storyData[i].source.name)

                storyTitle.appendChild(storyTitle_text)
                storySource.appendChild(storySource_text)

                storyTextWrapper.appendChild(storyTitle)
                storyTextWrapper.appendChild(storySource)

                const storyImage = new Image(355, 200)
                if (storyData[i].source.logo_url != null) {
                    storyImage.src = storyData[i].media[0].url
                    storyImageWrapper.appendChild(storyImage)
                } else {
                    storyImage.src = "../img/wrecked-iphone.jpg"
                    storyImageWrapper.appendChild(nullStory)
                }

                storyDiv.appendChild(storyImageWrapper)
                storyDiv.appendChild(storyTextWrapper)
                local_section.insertAdjacentElement('beforeend', storyDiv)

            }
        } catch (error) {
            console.error('FETCH Stories Failed: ', error)
        }
    }
}

export { handleSubmit }