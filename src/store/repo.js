import { observable, computed, action, decorate,configure } from 'mobx';
import axios from 'axios';

class repo {
	userName= 'twbs';
	currentRepo= 'bootstrap';
	repoData= [];
    loadIsuuesSuccess(issues,repoName) {
        let mapData = Object.assign({},issues[0].data);
        mapData['open_count'] = issues[1].data.total_count;
        mapData['closed_count'] = mapData.total_count - mapData.open_count;
        this.repoData = mapData;
        this.currentRepo = repoName;
    }

    loadIsuueSuccess(issues) {
        this.repoData = issues;
    }

    loadRepoSuccess(repoDetails) {
        this.repoData = repoDetails.repos;
        this.userName = repoDetails.userName;
    }

    setUserName(userName) {
        this.userName = userName;
    }

    loadIssues(repoName,userName) {
        var _this = this;
        let arr =[];
        arr.push(axios.get(`https://api.github.com/search/issues?q=repo:${userName}/${repoName}+type:issue`));
        arr.push(axios.get(`https://api.github.com/search/issues?q=repo:${userName}/${repoName}+type:issue+state:open`));
        return axios.all(arr).then(result => {
        //console.log(result);
        _this.loadIsuuesSuccess(result,repoName);
        });
    }


    loadIssue(issueNumber,userName,repoName) {
        var _this = this;
        return axios
        .get(`https://api.github.com/repos/${userName}/${repoName}/issues/${issueNumber}`)
        .then(issues => {
            _this.loadIsuueSuccess(issues.data);
        })
        .catch(err => {
            throw err;
        });
    }

    loadRepos(userName) {
        var _this = this;
        return axios
        .get(`https://api.github.com/users/${userName}/repos`)
        .then(repos => {
            _this.loadRepoSuccess({
            repos:repos.data,
            userName:repos.data[0].owner.login
            });
        })
        .catch(err => {
            throw err;
        });
    }

}
decorate(repo, {
  loadRepos: action,
  loadIssue: action,
  loadIssues: action,
  setUserName: action,
  userName: observable,
  currentRepo: observable,
  repoData: observable
});

const RepoStore = new repo();
export default RepoStore;