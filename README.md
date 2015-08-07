# pre-commit-demo
Demo using pre-commit scripts in a front end project

# To Use
* Clone the project, make a new branch and run `npm install` and then `gulp install-git-hooks`
* Make changes - add files, modify, etc... and then commit them - you should notice gulp tasks being ran on modified files!
*  If a change makes one of the gulp tasks (i.e. jshint) fail, then your commit should also fail!

# NOTES #
This is not meant to be a functional application of any kind - just demonstrating the usefulness of git hooks, especially
when combined with NodeJS and Gulp!
