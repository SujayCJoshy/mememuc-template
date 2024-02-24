import React, { useState, useEffect, useRef } from "react";
import { Container } from "react-bootstrap";
import Header from "../../Components/Editor/editorHeader"; // Assume this is in the same directory
import ImageSelector from "../../Components/Editor/editorImageSelector"; // Ensure this is created as per earlier instructions
import Canvas from "../../Components/Editor/editorCanvas"; // Ensure this is created as per earlier instructions
import TextEditor from "../../Components/Editor/editorTextEditor"; // Ensure this is created as per earlier instructions
import TemplateButtons from "../../Components/Editor/editorTemplateButtons"; // Ensure this is created as per earlier instructions
import ColorPopup from "../../Components/Editor/editorColorPopup"; // Ensure this is created as per earlier instructions

const EditorPage = () => {
  const [showPopup, setShowPopup] = useState(false);
  const [togglePopup, setTogglePopup] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [text, setText] = useState("");
  const [textColor, setTextColor] = useState("black");
  const [textSize, setTextSize] = useState(20);
  const [textStyle, setTextStyle] = useState("");
  const [textX, setTextX] = useState(50);
  const [textY, setTextY] = useState(50);
  const [outlineColor, setOutlineColor] = useState("#000000");
  const [outlineThickness, setOutlineThickness] = useState(2);
  const canvasRef = useRef();
  const [canvasColor, setCanvasColor] = useState("grey");
  const [imageSizeOption, setImageSizeOption] = useState("cover");
  const [fontFamily, setFontFamily] = useState("Arial");
  const [showColorPopup, setShowColorPopup] = useState(false);
  const [tempCanvasColor, setTempCanvasColor] = useState("white");

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return; // Ensure canvas is available
    const ctx = canvas.getContext("2d");

    // Clear canvas
    ctx.fillStyle = canvasColor; // Set canvas color
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw image
    if (selectedImage) {
      const image = new Image();
      image.src = selectedImage;
      image.onload = () => {
        // Calculate image dimensions based on the canvas size and selected option
        let imageWidth =
          imageSizeOption === "cover" ? canvas.width : canvas.width * 0.8;
        let imageHeight =
          imageSizeOption === "cover" ? canvas.height : canvas.height * 0.8;

        // Calculate image position based on canvas size and selected option
        const imageX = (canvas.width - imageWidth) / 2;
        const imageY = (canvas.height - imageHeight) / 2;

        // Render the image
        ctx.drawImage(image, imageX, imageY, imageWidth, imageHeight);

        // Clear the area for the image to prevent overlapping texts on multiple updates
        //ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Set the font using the selected fontFamily and textSize
        ctx.font = `${textSize}px ${fontFamily}`;
        ctx.fillText(text, textX, textY);

        // Draw text on top of the image
        ctx.fillStyle = textColor;

        // Apply text outline
        ctx.shadowColor = outlineColor;
        ctx.shadowBlur = outlineThickness;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        ctx.fillText(text, textX, textY);
      };
    }
  }, [
    selectedImage,
    text,
    textColor,
    textSize,
    textX,
    textY,
    textStyle,
    canvasColor,
    imageSizeOption,
    outlineColor,
    outlineThickness,
    fontFamily,
  ]);

  const confirmCanvasColorChange = () => {
    setCanvasColor(tempCanvasColor);
    setShowColorPopup(false);
  }; // Handler to confirm the canvas color change

  const toggleColorPopup = () => {
    setShowColorPopup(!showColorPopup);
  };

  const handleImageSelect = (event) => {
    const file = event.target.files[0];
    setSelectedImage(URL.createObjectURL(file));
    setShowPopup(false);
  };

  const handleImageUrlChange = (event) => {
    setImageUrl(event.target.value);
  };

  const handleAddImageUrl = () => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const extension = imageUrl
      .substring(imageUrl.lastIndexOf("."))
      .toLowerCase();
    if (imageExtensions.includes(extension)) {
      setSelectedImage(imageUrl);
      console.log("image added")
    } else {
      alert("Please provide a valid image URL.");
    }
    setShowPopup(false);
  };

  const handleSelectImage = (url) => {
    console.log(url)
    setSelectedImage(url);
    console.log("image added")
  };

  const handleTextChange = (event) => {
    setText(event.target.value);
  };

  const handleTextColorChange = (event) => {
    setTextColor(event.target.value);
  };

  const handleTextSizeChange = (event) => {
    setTextSize(parseInt(event.target.value));
  };

  const handleTextXChange = (event) => {
    setTextX(parseInt(event.target.value));
  };

  const handleTextYChange = (event) => {
    setTextY(parseInt(event.target.value));
  };

  const handleImageSizeOption = (event) => {
    setImageSizeOption(parseInt(event.target.value));
  };

  const handleSaveImage = () => {
    if (!canvasRef.current) {
      console.error("Canvas is not available");
      return;
    }

    try {
      const canvas = canvasRef.current;
      const dataURL = canvas.toDataURL("image/png");

      const link = document.createElement("a");
      link.href = dataURL;
      link.download = "edited_image.png"; // Set the default filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error saving the image:", error);
    }
  };

  const handleOutlineColorChange = (event) => {
    setOutlineColor(event.target.value);
  };

  const handleOutlineThicknessChange = (event) => {
    setOutlineThickness(parseInt(event.target.value));
  };

  const handleFontFamilyChange = (event) => {
    setFontFamily(event.target.value);
  };

  const handleToggleClick = (event) => {
    setTogglePopup(!togglePopup);
  };

  const handleTemplate = (selectedTemplate) => {
    console.log('Selected template in ParentComponent:', selectedTemplate);
    setText("Template 1 Text");
    setTextColor("white");
    setTextSize(20);
    setTextX(50);
    setTextY(50);
    setTextStyle("template1");
  };

  const handleSelectedTemplate = (template) => {
    console.log('Selected template in ParentComponent:', template);
    setText(template.text);
    setTextColor(template.textColor);
    setTextSize(template.textSize);
    setTextX(template.textX);
    setTextY(template.textY);
    setTextStyle("template1");
};

  const handleClearText = () => {
    setText("");
  };
  

  return (
    <Container fluid style={{ textAlign: "left" }}>
      <Header
        togglePopup={togglePopup}
        handleToggleClick={handleToggleClick}
      ></Header>
      {togglePopup && (
        <Container fluid style={{ textAlign: "left", marginTop: "20px" }}>
          <ImageSelector
            handleImageSelect={handleImageSelect}
            handleImageUrlChange={handleImageUrlChange}
            imageUrl={imageUrl}
            handleAddImageUrl={handleAddImageUrl}
            handleSelectImage={handleSelectImage}
          />
          <TemplateButtons
            onTemplateSelect={handleSelectedTemplate}
          />
          {/* Flex container for Canvas and TextEditor */}
          <div
            style={{
              display: "flex",
              justifyContent: "top",
              alignItems: "start",
              flexWrap: "wrap",
              gap: "20px",
              marginTop: "20px",
              backgroundColor: "grey",
              minHeight: "500px",
            }}
          >
            <div style={{ minWidth: "700px", minHeight: "500px" }}>
              <Canvas
                canvasRef={canvasRef}
                selectedImage={selectedImage}
                text={text}
                textColor={textColor}
                textSize={textSize}
                textX={textX}
                textY={textY}
                canvasColor={canvasColor}
                imageSizeOption={imageSizeOption}
                outlineColor={outlineColor}
                outlineThickness={outlineThickness}
                fontFamily={fontFamily}
              />
            </div>
            <div style={{ minWidth: "300px", minHeight: "500px" }}>
              <TextEditor
                text={text}
                fontFamily={fontFamily}
                textColor={textColor}
                textSize={textSize}
                textX={textX}
                textY={textY}
                outlineColor={outlineColor}
                outlineThickness={outlineThickness}
                imageSizeOption={imageSizeOption}
                handleImageSizeOption={handleImageSizeOption}
                handleTextChange={handleTextChange}
                handleFontFamilyChange={handleFontFamilyChange}
                handleTextColorChange={handleTextColorChange}
                handleTextSizeChange={handleTextSizeChange}
                handleTextXChange={handleTextXChange}
                handleTextYChange={handleTextYChange}
                handleOutlineColorChange={handleOutlineColorChange}
                handleOutlineThicknessChange={handleOutlineThicknessChange}
                handleClearText={handleClearText}
                handleSaveImage={handleSaveImage}
                handleCanvasColor={toggleColorPopup}
              />

              {showColorPopup && (
                <ColorPopup
                  tempCanvasColor={tempCanvasColor}
                  setTempCanvasColor={setTempCanvasColor}
                  confirmCanvasColorChange={confirmCanvasColorChange}
                />
              )}
            </div>
          </div>
        </Container>
      )}
    </Container>
  );
};

export default EditorPage;
