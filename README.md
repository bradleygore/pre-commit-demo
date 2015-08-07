# pre-commit-demo
Demo using pre-commit scripts in a front end project

# To Use
* Clone the repo locally and run `npm install && gulp install-git-hooks`
* Set a remote on your local repository
* Make changes - add files, modify, etc... and then try to commit them - you should notice gulp tasks being ran on modified files in the /js dir!
*  If a change makes one of the gulp tasks (i.e. jshint) fail, then your commit should also fail!

# NOTES #
This is not meant to be a functional application of any kind - just demonstrating the usefulness of git hooks, especially
when combined with NodeJS and Gulp!
