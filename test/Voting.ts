import { expect } from "chai";
import hre from "hardhat";

describe("Voting", function () {
  it("Should mint and vote", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Aziz, notVoter] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(Aziz.address, 100);

    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(Aziz).submitProposal("Proposal 2");

    await voting.connect(owner).vote(0, true);
    await voting.connect(Aziz).vote(1, false);

    const proposal1 = await voting.proposals(0);
    const proposal2 = await voting.proposals(1);

    expect(proposal1.yesVotes).to.equal(1);
    expect(proposal1.noVotes).to.equal(0);
    expect(proposal2.yesVotes).to.equal(0);
    expect(proposal2.noVotes).to.equal(1);
  });
});

describe("Voting", function () {
  it("no token no vote", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Aziz] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);

    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(Aziz).submitProposal("Proposal 2");

    await voting.connect(owner).vote(0, true);
    await expect(voting.connect(Aziz).vote(1, false)).to.be.revertedWith("No tokens to vote");

    const proposal1 = await voting.proposals(0);
    const proposal2 = await voting.proposals(1);

    expect(proposal1.yesVotes).to.equal(1);
    expect(proposal1.noVotes).to.equal(0);
    
    
  });
});
describe("Voting", function () {
  it("has voted", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Aziz, notVoter] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(Aziz.address, 100);

    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(Aziz).submitProposal("Proposal 2");
    await voting.connect(Aziz).submitProposal("Proposal 3");

    await voting.connect(owner).vote(0, true);
    await voting.connect(Aziz).vote(1, false);
    await voting.connect(Aziz).vote(2, true);

    const proposal1 = await voting.proposals(0);
    const proposal2 = await voting.proposals(1);
    const proposal3 = await voting.proposals(3);

    expect(proposal1.yesVotes).to.equal(1);
    expect(proposal1.noVotes).to.equal(0);
    expect(proposal2.yesVotes).to.equal(0);
    expect(proposal2.noVotes).to.equal(1);
    expect(proposal3.yesVotes).to.equal(0);
    expect(proposal3.noVotes).to.equal(0);
  });
});

describe("Voting", function () {
  it("reach maximum voting limit", async function () {
    const Voting = await hre.ethers.getContractFactory("VotingSystem");
    const voting = await Voting.deploy();
    await voting.waitForDeployment();

    const [owner, Aziz, ahmad , abdulrahamn , Mohammed , Saleh] = await hre.ethers.getSigners();

    await voting.mint(owner.address, 100);
    await voting.mint(Aziz.address, 100);
    await voting.mint(ahmad.address, 100);
    await voting.mint(abdulrahamn.address, 100);
    await voting.mint(Mohammed.address, 100);
    await voting.mint(Saleh.address, 100);

    await voting.connect(owner).submitProposal("Proposal 1");
    await voting.connect(Aziz).submitProposal("Proposal 2");
    await voting.connect(ahmad).submitProposal("Proposal 3");
    await voting.connect(abdulrahamn).submitProposal("Proposal 4");
    await voting.connect(Mohammed).submitProposal("Proposal 5");
    await voting.connect(Saleh).submitProposal("Proposal 6");

    await voting.connect(owner).vote(0, true);
    await voting.connect(Aziz).vote(1, false);
    await voting.connect(ahmad).vote(2, false);
    await voting.connect(abdulrahamn).vote(3, false);
    await voting.connect(Mohammed).vote(4, false);
    await expect(voting.connect(Saleh).vote(5,false))
        .to.be.revertedWith("reach maximum voting limit");

   

    const proposal1 = await voting.proposals(0);
    const proposal2 = await voting.proposals(1);
    const proposal3 = await voting.proposals(2);
    const proposal4 = await voting.proposals(3);
    const proposal5 = await voting.proposals(4);
    const proposal6 = await voting.proposals(5);

    expect(proposal1.yesVotes).to.equal(1);
    expect(proposal1.noVotes).to.equal(0);

    expect(proposal2.yesVotes).to.equal(0);
    expect(proposal2.noVotes).to.equal(1);

    expect(proposal3.yesVotes).to.equal(0);
    expect(proposal3.noVotes).to.equal(1);

    expect(proposal4.yesVotes).to.equal(0);
    expect(proposal4.noVotes).to.equal(1);

    expect(proposal5.yesVotes).to.equal(0);
    expect(proposal5.noVotes).to.equal(1);

    expect(proposal6.yesVotes).to.equal(0);
    expect(proposal6.noVotes).to.equal(0);
  });
});