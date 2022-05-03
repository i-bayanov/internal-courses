import buildTagObjectModel from './buildTagObjectModel';

const TAG1 = '<div id="first" class="block for first example" tabindex="256" hidden data-user-name="user" data-user-surname="surname">Hidden block</div>';
const MODEL1 = {
  tagName: 'div',
  id: 'first',
  classList: ['block', 'for', 'first', 'example'],
  tabindex: '256',
  hidden: true,
  dataset: { userName: 'user', userSurname: 'surname' },
  innerText: 'Hidden block',
};
const TAG2 = '<input type="radio" name="browser" value="opera">Opera<br>';
const MODEL2 = {
  tagName: 'input',
  type: 'radio',
  name: 'browser',
  value: 'opera',
};
const TAG3 = '<img src="address" alt="text" style="background-color: red; border: 4px double black; z-index: 2">';
const MODEL3 = {
  tagName: 'img',
  src: 'address',
  alt: 'text',
  style: {
    backgroundColor: 'red',
    border: '4px double black',
    zIndex: '2',
  }
};

describe('Tag object model builder', () => {
  test('should return an object with correct property names and their values', () => {
    expect(buildTagObjectModel(TAG1)).toEqual(MODEL1);
  });

  test('should return correct object if tag is void element', () => {
    expect(buildTagObjectModel(TAG2)).toEqual(MODEL2);
  });

  test('should return correct object if tag have inline styles', () => {
    expect(buildTagObjectModel(TAG3)).toEqual(MODEL3);
  })
});
