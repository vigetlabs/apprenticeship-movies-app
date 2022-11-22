import { ComponentStory, ComponentMeta } from "@storybook/react";
import Poster from "../components/poster/Poster";

// eslint-disable-next-line @typescript-eslint/consistent-type-assertions
export default {
  title: "Poster",
  component: Poster,
} as ComponentMeta<typeof Poster>;

const Template: ComponentStory<typeof Poster> = (args) => <Poster {...args} />;

export const Image = Template.bind({});
Image.args = {
  image: "https://image.tmdb.org/t/p/w780/b6IRp6Pl2Fsq37r9jFhGoLtaqHm.jpg",
  alt: "Alt Text",
};
