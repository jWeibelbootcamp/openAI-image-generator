const onSubmit = (e) => {
    e.preventDefault();

    // add number later
    const prompt = document.querySelector('#prompt').value;
    const size = document.querySelector('#size').value;

    if (prompt === '') {
        alert('Please add a description.');
        return;
    };

    generateImageRequest(prompt, size)
};

const generateImageRequest = async (prompt, size) => {
    try {
        showSpinner();

        const response = await fetch('/openai/generateimage', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt, 
                size
            })
        });

        // check for errors the catch will miss and remove spinner or it stays
        if (!response.ok) {
            removeSpinner()
            throw new Error('That image could not be generated');
        };

        const data = await response.json();
        console.log(data);
        removeSpinner();
    } catch (error) {
        document.querySelector('.msg').textContent = error;
    }
};

const showSpinner = () => {
    document.querySelector('.spinner').classList.add('show');
};

const removeSpinner = () => {
    document.querySelector('.spinner').classList.remove('show');
};

document.querySelector('#image-form').addEventListener('submit', onSubmit);