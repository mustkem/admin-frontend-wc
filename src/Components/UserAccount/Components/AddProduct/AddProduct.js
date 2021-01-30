import React from "react";
import { Form, Col, Row, Button } from "react-bootstrap";
import Select from "react-select";
import { toast } from "react-toastify";

import "./style/index.scss";

import axios from "axios";

import { API_URL } from "../../../../config";

const options = [
  { value: "chocolate", label: "Chocolate" },
  { value: "strawberry", label: "Strawberry" },
  { value: "vanilla", label: "Vanilla" },
];

function AddProduct(props) {
  console.log("token", localStorage.getItem("woodenculture-token-admin"));
  const [features, setFeatures] = React.useState([{ title: "", desc: "" }]);
  const [images, setImages] = React.useState([{ url: "" }]);
  const [categories, setCategories] = React.useState([options[2], options[0]]);

  const [formData, setFormData] = React.useState({
    title: "",
    description: "",
  });

  const handleAddMoreFeatures = () => {
    const updatedFeatures = [...features];
    updatedFeatures.push({ title: "", desc: "" });
    setFeatures(updatedFeatures);
  };

  const handleRemoveFeature = (index) => {
    const updatedFeatures = [...features];
    updatedFeatures.splice(index, 1);
    setFeatures(updatedFeatures);
  };

  const handleAddMoreImage = () => {
    const updatedImage = [...images];
    updatedImage.push({ url: "" });
    setImages(updatedImage);
  };

  const handleRemoveImage = (index) => {
    const updatedImage = [...images];
    updatedImage.splice(index, 1);
    setImages(updatedImage);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      title: formData.title,
      description: formData.description,

      features,
      images,
      categories: categories.map((item) => {
        return { cateId: item.value };
      }),
    };
    console.log("payload", JSON.stringify(payload));

    axios({
      method: "post",
      url: API_URL + "/admin/product",
      data: payload,
      headers: {
        Authorization: "Bearer " + localStorage.getItem("woodenculture-token-admin"),
      },
    })
      .then(function (response) {
        setFeatures([{ title: "", desc: "" }]);
        setImages([{ url: "" }]);
        setCategories([]);
        setFormData({ title: "", description: "" });
        toast("Product added successfully");
        return response.data;
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  const handleChange = (key, e) => {
    const updatedFormData = { ...formData };
    updatedFormData[key] = e.target.value;
    setFormData(updatedFormData);
  };

  const handleChangeCategories = (selectedOptions) => {
    setCategories(selectedOptions);
  };

  console.log("features", features);

  return (
    <div className="middle-layout-strip">
      <div className="title">
        <Form onSubmit={handleSubmit}>
          <Form.Row>
            <Form.Group as={Col}>
              <Form.Label>Title</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter title"
                value={formData.title}
                onChange={(e) => {
                  handleChange("title", e);
                }}
              />
            </Form.Group>

            <Form.Group as={Col}>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                placeholder="enter"
                value={formData.description}
                onChange={(e) => {
                  handleChange("description", e);
                }}
              />
            </Form.Group>
          </Form.Row>

          <Form.Group controlId="formGridAddress1">
            <Form.Label>Categories</Form.Label>
            <Select
              defaultValue={categories}
              isMulti
              name="categories"
              options={options}
              className="basic-multi-select"
              classNamePrefix="select"
              onChange={handleChangeCategories}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Features</Form.Label>
            <Row>
              {features.map((item, index) => {
                console.log("test");
                return (
                  <Col sm={6}>
                    <Form.Group key={index}>
                      <Form.Control
                        type="text"
                        placeholder="Feature Name"
                        value={item.title}
                        onChange={(e) => {
                          const updatedFeatures = [...features];
                          updatedFeatures[index].title = e.target.value;
                          setFeatures(updatedFeatures);
                        }}
                      />
                      <Form.Control
                        type="text"
                        placeholder="Feature Description"
                        value={item.desc}
                        onChange={(e) => {
                          const updatedFeatures = [...features];
                          updatedFeatures[index].desc = e.target.value;
                          setFeatures(updatedFeatures);
                        }}
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={() => {
                            handleRemoveFeature(index);
                          }}
                          size="sm"
                          variant="outline-secondary"
                        >
                          x
                        </Button>
                      </div>
                    </Form.Group>
                  </Col>
                );
              })}
            </Row>
            <div className="flex justify-end">
              <Button size="sm" variant="outline-primary" onClick={handleAddMoreFeatures}>
                Add More Features
              </Button>
            </div>
          </Form.Group>
          <Form.Group>
            <Form.Label>Images</Form.Label>
            <Row>
              {images.map((item, index) => {
                return (
                  <Col sm={6}>
                    <Form.Group key={index}>
                      <Form.Control
                        type="text"
                        placeholder="images url"
                        value={item.url}
                        onChange={(e) => {
                          const updatedImages = [...images];
                          updatedImages[index].url = e.target.value;
                          setImages(updatedImages);
                        }}
                      />
                      <div className="flex justify-end">
                        <Button
                          onClick={() => {
                            handleRemoveImage(index);
                          }}
                          size="sm"
                          variant="outline-secondary"
                        >
                          x
                        </Button>
                      </div>
                    </Form.Group>
                  </Col>
                );
              })}
            </Row>
            <div className="flex justify-end">
              <Button size="sm" variant="outline-primary" onClick={handleAddMoreImage}>
                Add More Imges
              </Button>
            </div>
          </Form.Group>

          <Button variant="primary" type="submit">
            Submit
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default AddProduct;
