import React, { useState } from 'react';
import { useSpring, animated } from 'react-spring';
import { GoogleGenerativeAI } from "@google/generative-ai";
import './Image.css';

const genAI = new GoogleGenerativeAI(`AIzaSyCwTEOUMvj3o9qzSJnYfspo8eQSB5yHCGc`);

async function generateDescription(imagePart) {
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  const result = await model.generateContent([
    "Give a float value up to 2 decimal to this picture based on the facial expressions of the person which will be within the range of 0 to 1 where 0 means absolutely unstressed, 1 means absolutely stressed and 0.5 means normal, just the number without any text :", 
    imagePart
  ]);
  
  const response = await result.response;
  const text = await response.text();

  return text;
}

const Pic = ({ setChat }) => {
  const props = useSpring({
    opacity: 1,
    from: { opacity: 0 },
    config: { duration: 2500 }, // Adjust the duration as needed
  });

  const [description, setDescription] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [generate, setGenerate] = useState(true);
  const [enter, setEnter] = useState('Select an Image');

  const simulateTyping = async (text) => {
    setLoading(true);

    let index = 0;
    const cleanText = String(text);

    const typingInterval = setInterval(() => {
      if (index <= cleanText.length) {
        setDescription((prevDescription) => cleanText.slice(0, index));
        index++;
      } else {
        clearInterval(typingInterval);
        setGenerate(true);
      }
    }, 30); // Adjust the typing speed as needed
  };

  const handleFileChange = (event) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedImage(file);
    }
  };

  const arrayBufferToBase64 = (buffer) => {
    let binary = '';
    const bytes = new Uint8Array(buffer);

    for (let i = 0; i < bytes.length; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  };

  const submitDescriptionRequest = async () => {
    try {
      if (!selectedImage) {
        console.error('No image selected.');
        return;
      }
      setLoading(false);
      setEnter('Analyzing Image...');
      setGenerate(false);

      const arrayBuffer = await selectedImage.arrayBuffer();
      const base64Data = arrayBufferToBase64(arrayBuffer);

      const imagePart = {
        inlineData: {
          data: base64Data,
          mimeType: selectedImage.type,
        },
      };

      let text = await generateDescription(imagePart);

      setDescription('');
      text = text.replace(/\bundefined\b/g, "");
      console.log(text);
      simulateTyping(text);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <>
      <animated.div style={props}>
        <h1 className='head'>Made by Sohel</h1>
        <div className="container">
          <div className="chat-header">
            <h2 className="title">Image Description Generator</h2>
            <button onClick={() => setChat(true)}>
              Start Chatting
            </button>
          </div>

          <div className="fileContainer">
            <input type="file" accept="image/*" onChange={handleFileChange} />
            {generate ? (
              <button className="button" onClick={submitDescriptionRequest}>
                Generate Description
              </button>
            ) : (
              <button className='gen'>Generating</button>
            )}
          </div>
          <div>
            {selectedImage && (
              <div className="selectedImage">
                <h2>Selected Image:</h2>
                <img
                  src={URL.createObjectURL(selectedImage)}
                  alt="Selected"
                  style={{ maxWidth: '100%', maxHeight: '300px' }}
                />
              </div>
            )}
            {!loading && <p className="loading"><b>SOHEL:</b> {enter}</p>}
            {loading && description && (
              <p className="description"><b>SOHEL:</b> {description}</p>
            )}
          </div>
        </div>
      </animated.div>
    </>
  );
};

export default Pic;
