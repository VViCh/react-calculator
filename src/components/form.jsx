import React, { useRef, useState, useEffect } from "react";
import FormStyle from "./styles/form.module.css";
import Modal from '@mui/material/Modal';

const Form = ({ handleSubmit, formRef, closeModal, modalIsOpen }) => {
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        const requiredInputs = document.querySelectorAll("input:required");
        const radioInputs = document.querySelectorAll("input[name='topic']");
        const stateHandle = () => {
            let allFilled = true;
            requiredInputs.forEach((input) => {
                if (input.value.trim() === "") {
                    allFilled = false;
                }
            });

            let checkedTopic = document.querySelector("input[name='topic']:checked");
            if (checkedTopic == null) {
                allFilled = false;
            }

            setIsFormValid(allFilled);
        };

        radioInputs.forEach((radio) => {
            radio.addEventListener("change", stateHandle);
        });

        requiredInputs.forEach((input) => {
            input.addEventListener("input", stateHandle);
        });

        stateHandle();
        return () => {
            radioInputs.forEach((radio) => {
                radio.removeEventListener("change", stateHandle);
            }); requiredInputs.forEach((input) => {
                input.removeEventListener("input", stateHandle);
            });
        }; 
    }, []);

    return (
        <>
            <form ref={formRef} action="" method="post" className={FormStyle.form} onSubmit={handleSubmit}>
                <div className={FormStyle.leftSide}>
                    <div className={FormStyle.name}>
                        <label>Name <span className={FormStyle.required}>*</span></label>
                        <div className={FormStyle.nameInput}>
                            <div className={FormStyle.namePartInput}>
                                <input type="text" className={FormStyle.requiredInput} name="first-name" id="first-name-input" required></input>
                                <label for="first-name">First</label>
                            </div>
                            <div className={FormStyle.namePartInput}>
                                <input type="text" className={FormStyle.requiredInput} name="last-name" id="last-name-input"required></input>
                                <label for="last-name">Last</label>
                            </div>
                        </div>
                    </div>
                    <div className={FormStyle.email}>
                        <label for="email-input">Email <span className={FormStyle.required}>*</span></label>
                        <input type="email" className={FormStyle.requiredInput} name="email" id="email-input" required></input>
                    </div>
                    <div className={FormStyle.topic}>
                        <label>Topic <span className={FormStyle.required}>*</span></label>
                        <div className={FormStyle.topicInput}>
                            <label>What can we help you today?</label>
                            <div className={FormStyle.radioInput}>
                                <input type="radio" className={FormStyle.requiredInput} name="topic" id="topic-general" value="General" required></input>
                                <label for="topic-general">General</label>
                            </div>
                            <div className={FormStyle.radioInput}>
                                <input type="radio" className={FormStyle.requiredInput} name="topic" id="topic-bug" value="Bug" required></input>
                                <label for="topic-bug">Bug</label>
                            </div>
                        </div>
                    </div>
                </div>
                <div className={FormStyle.rightSide}>
                    <div className={FormStyle.description}>
                        <label for="description-input">Description<sup className={FormStyle.optional}>optional</sup></label>
                        <textarea rows="12" className={FormStyle.descriptionInput} name="description" id="description-input" placeholder="Description Report"></textarea>
                    </div>
                </div>
                <div className={FormStyle.formSubmit}>
                    <button className={FormStyle.formSubmitButton} type="submit" id="submit-button" disabled={!isFormValid}>SEND</button>
                </div>
            </form>
            <div className={FormStyle.modalContainer}>
                <Modal open={modalIsOpen} onClose={closeModal}>
                    <div className={FormStyle.modalContent}>
                        <h2>Form Submission Failed</h2>
                        <p>Please try again</p>
                        <button onClick={closeModal} className={FormStyle.modalButton}>Close</button>
                    </div>
                </Modal>
            </div>
        </>
    );
}

export default Form;