import { shallowMount } from '@vue/test-utils';
import VoteComponent from '../../src/components/VoteComponent/VoteComponent.vue';

describe('VoteComponent.vue', () => {
  it('should set the name sent in props to the html element with de class .vote-module__name', () => {
    const propName = 'Mateo';
    const wrapper = shallowMount(VoteComponent, {
      propsData: {
        name: propName,
      },
    });
    const htmlElement = wrapper.find('.vote-module__name');
    expect(htmlElement.text()).toMatch(propName);
  });
  it('Number of likes should increment', () => {
    const testLikes = 3;
    const selectedVotedTemp = 'liked';
    const wrapper = shallowMount(VoteComponent);
    wrapper.setData({
      localLikes: testLikes,
      selectedVote: selectedVotedTemp,
    });
    wrapper.vm.$parent = {
      updateVotes: () => {},
    };
    jest.spyOn(wrapper.vm.$parent, 'updateVotes');
    wrapper.vm.updatePopularity();
    expect(wrapper.vm.$data.localLikes).toBe(testLikes + 1);
  });
  it('Number of likes should decrement', () => {
    const testDislikes = 3;
    const selectedVotedTemp = 'disliked';
    const wrapper = shallowMount(VoteComponent);
    wrapper.setData({
      localDislikes: testDislikes,
      selectedVote: selectedVotedTemp,
    });
    wrapper.vm.$parent = {
      updateVotes: () => {},
    };
    jest.spyOn(wrapper.vm.$parent, 'updateVotes');
    wrapper.vm.updatePopularity();
    expect(wrapper.vm.$data.localDislikes).toBe(testDislikes + 1);
  });
  it('Number of likes should decrement', () => {
    const selectedVotedTemp = 'liked';
    const testVoted = false;
    const wrapper = shallowMount(VoteComponent);
    wrapper.setData({
      voted: testVoted,
      selectedVote: selectedVotedTemp,
    });
    wrapper.vm.$parent = {
      updateVotes: () => {},
    };
    jest.spyOn(wrapper.vm.$parent, 'updateVotes');
    wrapper.vm.voteAgain();
    expect(wrapper.vm.$data.voted).toBe(false);
    expect(wrapper.vm.$data.selectedVote).toMatch('');
  });
});
