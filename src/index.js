import {
  TextControl,
  Flex,
  FlexBlock,
  FlexItem,
  Icon,
  Button,
} from "@wordpress/components";
import "./index.scss";

wp.blocks.registerBlockType("ourplugin/are-you-paying-attention", {
  title: "Are You Paying Attention?",
  icon: "smiley",
  category: "common",
  attributes: {
    question: { type: "string" },
    answers: { type: "array", default: ["red", "blue"] },
  },
  edit: EditComponent,
  save: function (props) {
    return null;
  },
});

function EditComponent(props) {
  function updateQuestion(value) {
    props.setAttributes({ question: value });
  }

  return (
    <div className="paying-attention-edit-block">
      <TextControl
        label="Question:"
        value={props.attributes.question}
        onChange={updateQuestion}
      />
      <p>Answers: </p>
      {props.attributes.answers.map(function (answers, index) {
        return (
          <Flex>
            <FlexBlock>
              <TextControl
                value={answers}
                onChange={(newValue) => {
                  const newAnswers = [props.attributes.answers];
                  newAnswers[index] = newValue;
                  props.setAttributes({ answers: newAnswers });
                }}
              />
            </FlexBlock>
            <FlexItem>
              <Button>
                <Icon icon="star-empty"></Icon>
              </Button>
            </FlexItem>
            <FlexItem>
              <Button>Delete</Button>
            </FlexItem>
          </Flex>
        );
      })}
      <Button
        isPrimary
        onClick={() => {
          props.setAttributes({ answers: [...props.attributes.answers, ""] });
        }}
      >
        Add another answer
      </Button>
    </div>
  );
}
