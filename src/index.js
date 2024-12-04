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
  },
  edit: EditComponent,
  save: function (props) {
    return null;
  },
});

function EditComponent(props) {
  function updateSkyColor(event) {
    props.setAttributes({ skyColor: event.target.value });
  }

  function updateGrassColor(event) {
    props.setAttributes({ grassColor: event.target.value });
  }

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
      <Flex label="Answers:">
        <FlexBlock>
          <TextControl />
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
      <Button isPrimary>Add another answer </Button>
    </div>
  );
}
